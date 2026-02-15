"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
  if (!user) return;

  fetchBookmarks();

  const channel = supabase
    .channel("bookmarks-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookmarks",
      },
      () => {
        fetchBookmarks();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);


  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const addBookmark = async () => {
    if (!user) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
    fetchBookmarks();
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <div className="flex justify-between mb-6">
        <p className="text-sm">Logged in as: {user.email}</p>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Smart Bookmark App</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={addBookmark}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-6"
      >
        Add Bookmark
      </button>

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center border p-3 mb-2 rounded"
        >
          <a
            href={bookmark.url}
            target="_blank"
            className="text-blue-600"
          >
            {bookmark.title}
          </a>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
