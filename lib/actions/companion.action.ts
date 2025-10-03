"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create Companion");
  return data[0];
};

export const getAllCompanion = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  let query = supabase.from("companions").select().eq("author", userId);

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);
  return companions;
};

export const getCompanionById = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);
  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUser = async (): Promise<UserResponse> => {
  try {
    const { userId } = await auth();

    const client = await clerkClient();
    const user = await client.users.getUser(userId as string);
    if (!user) {
      return {
        data: null,
        error: "user not found",
      };
    }
    return {
      data: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImg: user?.imageUrl,
      },
      error: null,
    };
  } catch (error) {
    console.error("Clerk get user error: ", error);
    return { data: null, error: "Failed to fetch user" };
  }
};

export const getHistoryCompanion = async () => {
  const { userId } = await auth();
  if (!userId) return { data: null, error: "Unauthorized" };

  const supabase = createSupabaseClient();

  // 1. Ambil data history
  const { data: history, error: errorHistory } = await supabase
    .from("session_history")
    .select("companion_id")
    .eq("user_id", userId);

  if (errorHistory) return { data: null, error: errorHistory.message };
  if (!history || history.length === 0) return { data: [], error: null };

  // 2. Ambil list companion_id dari history
  const companionIds = history.map((h) => h.companion_id);

  // 3. Ambil data companion berdasarkan companion_id
  const { data: companions, error: errorCompanions } = await supabase
    .from("companions")
    .select("*")
    .in("id", companionIds); // pakai .in untuk filter by array id

  if (errorCompanions) return { data: null, error: errorCompanions.message };

  return { data: companions, error: null };
}