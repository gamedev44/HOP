import React from 'react';
import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

export const SocialLogin: React.FC = () => {
  return (
    <SignIn 
      appearance={{
        baseTheme: dark,
        elements: {
          rootBox: "w-full",
          card: "bg-[#2f3136] border-none shadow-xl",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton: "bg-[#5865F2] text-white hover:bg-[#4752C4]",
          formButtonPrimary: "bg-[#5865F2] hover:bg-[#4752C4]",
          footerActionLink: "text-[#5865F2] hover:text-[#4752C4]",
          formFieldInput: "bg-[#40444b] border-none text-white",
          dividerLine: "bg-[#40444b]",
          dividerText: "text-gray-400",
          formFieldLabel: "text-gray-300",
          socialButtonsProviderIcon: "w-5 h-5",
          identityPreviewText: "text-gray-300",
          identityPreviewEditButton: "text-[#5865F2]"
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton"
        }
      }}
      afterSignInUrl="/chat"
      signUpUrl="/sign-up"
      routing="path"
      path="/login"
      redirectUrl="/chat"
      signInUrl="/login"
    />
  );
};