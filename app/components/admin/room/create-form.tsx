"use client";
import Image from "next/image";
import { type PutBlobResult } from "@vercel/blob";
import { useRef, useState, useTransition, useActionState} from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import {BarLoader} from "react-spinners";
import { saveRoom } from "@/lib/actions";
import {Amenities} from "@prisma/client";
import clsx from "clsx";



const CreateForm = ({amenities}:{amenities:Amenities[]}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
            try {
            const response = await fetch("/api/upload", {
                method: "PUT",
                body: formData,
            });
        
            const data = await response.json();
        
            if (response.status !== 200) {
                setMessage(data.message || "Upload failed");
                return;
            }
        
            const img = data as PutBlobResult;
            setImage(img.url);
            setMessage("Upload success!");
            } catch (error) {
            console.error(error);
            setMessage("An error occurred during upload");
            }
        })
    };

    const deleteImage = (image:string) => {
      startTransition(async()=>{
          try {
            await fetch (`/api/upload/?imageUrl=${image}`,
            {method:"DELETE"
          });
          setImage("")
          } catch (error){
            
        }
      });
    }

    const [state, formAction, isPending] = useActionState(saveRoom.bind(null,image), null)

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="col-span-8 bg-white p-4">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">{state?.error?.name}</span>
            </div>
          </div>

          <div className="mb-4">
            <textarea
              name="description"
              rows={8}
              placeholder="Description"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">{state?.error?.description}</span>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            {amenities.map((item)=>(
               <div className="flex items-center gap-1" key={item.id}>
               <input
                 type="checkbox"
                 id={`amenity-create-${item.id}`}
                 name="amenities"
                 defaultValue={item.id}
                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
               />
               <label htmlFor={`amenity-create-${item.id}`} className="text-sm font-medium text-gray-900 capitalize">
                 {item.name}
               </label>
             </div>
            ))}
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">{state?.error?.amenities}</span>
            </div> 
          </div>
        </div>

        <div className="col-span-4 bg-white p-4">
        <label
  htmlFor="input-file"
  className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative overflow-hidden"
>
  {pending ? <BarLoader /> : null}

  {image ? (
    <>
      <Image
        src={image}
        alt="image"
        width={640}
        height={360}
        className="rounded-sm absolute inset-0 object-cover z-10"
      />

      <button
        type="button"
        onClick={() => deleteImage(image)}
        className="flex items-center justify-center bg-black/50 size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-500 transition-colors z-20"
      >
        <IoTrashOutline className="size-4" />
      </button>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
      <IoCloudUploadOutline className="size-8" />
      <p className="mb-1 text-sm font-bold">Select Image</p>
      {message ? (
        <p className="text-xs text-red-500">{message}</p>
      ) : (
        <p className="text-xs">SVG, PNG, JPG, GIF, or Others (Max: 4MB)</p>
      )}
    </div>
  )}

  {!image && (
    <input
      type="file"
      ref={inputFileRef}
      onChange={handleUpload}
      id="input-file"
      className="hidden"
    />
  )}
</label>


  {message && (
    <p className="text-sm text-center text-gray-600 mb-4">{message}</p>
  )}

  <div className="mb-4">
    <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900">
      Capacity (Person)
    </label>
    <input
      type="text"
      id="capacity"
      name="capacity"
      placeholder="Capacity..."
      className="py-2 px-4 rounded-sm border border-gray-400 w-full"
    />
    <div aria-atomic="true" aria-live="polite">
      <span className="text-sm text-red-500 mt-2">{state?.error?.capacity}</span>
    </div>
  </div>

  <div className="mb-4">
    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
      Price (IDR/Night)
    </label>
    <input
      type="text"
      id="price"
      name="price"
      placeholder="Price..."
      className="py-2 px-4 rounded-sm border border-gray-400 w-full"
    />
    <div aria-atomic="true" aria-live="polite">
      <span className="text-sm text-red-500 mt-2">{state?.error?.price}</span>
    </div>
  </div>

    {/* General Message */}
{state?.message? (
  <div className="mb-4 bg-red-200 p-2">
    <span className="text-sm text-gray-700 mt-2">{state.message}</span>
  </div>
):null}

  <button
  disabled = {isPending}  
  type="submit"
    className= {clsx("bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer", {
      "opacity-50 cursor-progress" :isPending
    })}
  >
    {isPending? "Saving.." : "Save"}
  </button>
</div>

      </div>
    </form>
  );
};

export default CreateForm;
