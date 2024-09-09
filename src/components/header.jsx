import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const {user} = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-centre">
        <Link>
          <img src="/logo.png" className="h-20"></img>
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* add a condition here */}

            {user?.unsafeMetadata?.role === "recruiter"&&(
              <Link to="/post-job">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2"></PenBox>
                Post a Job
              </Button>
            </Link>
            )}

            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={
                    <BriefcaseBusinessIcon size={15}></BriefcaseBusinessIcon>
                  }
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15}></Heart>}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {/* Agrr showSignIn true hoga tabhi niche wala implement hoga */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          ></SignIn>
        </div>
      )}
    </>
  );
};

export default Header;
