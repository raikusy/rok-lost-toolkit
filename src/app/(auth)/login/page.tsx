import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/google";
import { PAGES } from "@/config/pages";

export default function Page() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Login To Save Your Stylish Mails
        </p>
      </div>
      <div className="grid gap-4">
        {/* <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button> */}
        <Link href="/login/google">
          <Button variant="outline" className="w-full">
            <GoogleIcon className="me-2" />
            Login with Google
          </Button>
        </Link>
        <Link href={PAGES.HOME}>
          <Button className="w-full">Go back home</Button>
        </Link>
      </div>
      {/* <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div> */}
    </>
  );
}
