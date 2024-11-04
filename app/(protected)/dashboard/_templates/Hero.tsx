"use client";

import { useAuthSession } from "@/app/client/hooks/useAuthSession";

export const HeroTemplate = () => {
  const { data: authData, isPending } = useAuthSession();

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <code>{JSON.stringify(authData, null, 2)}</code>
    </section>
  );
};
