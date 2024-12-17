"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);


  if (error) {
    // const randomString= crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
    redirect(`/login?message=Could not authenticate user`);
  }
  revalidatePath("/", "layout");
  redirect("/dashboard");

}

export async function signup(formData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        first_name: formData.get("name"),
      },
    },
  });


  if (error) {
    console.log(error);
    redirect("/signup?message=Error signing up");
  }


  


  revalidatePath("/", "layout");
  redirect("./signupSuccess");
}

export async function signOut(){
  const supabase=await createClient();
  await supabase.auth.signOut();
  redirect('./login')
}



