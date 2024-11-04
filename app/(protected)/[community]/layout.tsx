import Link from "next/link";
import { getCommunity } from "@/app/server/actions/getCommunity";

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { community: string };
}) {
  // Will throw a 404 not found if community does not exist
  // or the current session is not authorized to view it
  const community = await getCommunity(params?.community);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href={`/${community.slug}`}>Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
