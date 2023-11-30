import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gucrwoegryslkclkyefh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Y3J3b2VncnlzbGtjbGt5ZWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMzU0MDQsImV4cCI6MjAxNTYxMTQwNH0.Wvbkvn-Z0HPiyrXrEtQ23yaitDkaK9dZfHONl6IASnk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
