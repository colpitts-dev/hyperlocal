import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/server/helpers/getQueryClient";
import { CommunityTemplate } from "./_templates/Community";
import { prefetchCommunity } from "@/app/_lib/server/helpers/prefetchQuery";
import { COMMUNITY_QUERY_KEY } from "@/app/client/hooks/useCommunityQuery";

export default async function CommunityHome({
  params,
}: {
  params: { community: string };
}) {
  // Get the community slug from the URL
  const slug = params.community;
  // Prefetch community data server side
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [COMMUNITY_QUERY_KEY, slug],
    queryFn: () => prefetchCommunity(slug),
  });
  // Dehydrate the query client state
  const pageData = dehydrate(queryClient);

  return (
    <HydrationBoundary state={pageData}>
      <CommunityTemplate slug={slug} />
    </HydrationBoundary>
  );
}
