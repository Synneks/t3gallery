/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid photo ID");
  }
  const image = await getImage(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>
      <div className="flex flex-1 items-center border-l-4">
        <ImageDetails
          imageName={image.name}
          imageCreatedAt={image.createdAt.toLocaleDateString()}
          uploaderFullName={uploaderInfo.fullName}
        />
      </div>
    </div>
  );
}

function ImageDetails({
  imageName,
  imageCreatedAt,
  uploaderFullName,
}: {
  imageName: string;
  imageCreatedAt: string;
  uploaderFullName: string | null;
}) {
  return (
    <div className="w-full text-center">
      <div className="border-b-4 p-2  text-xl font-bold">{imageName}</div>
      <div className="p-2">
        <span>Uploaded by: {uploaderFullName}</span>
      </div>

      <div className="p-2">
        <span>Created on: {imageCreatedAt}</span>
      </div>
    </div>
  );
}
