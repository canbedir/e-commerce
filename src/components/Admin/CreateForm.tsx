"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../General/Heading";
import CheckboxComponent from "../General/Checkbox";
import { FaComputer, FaGlasses, FaShirt, FaTablet } from "react-icons/fa6";
import { TbShoe } from "react-icons/tb";
import ChoiceInput from "../General/ChoiceInput";
import { Button } from "../ui/button";
import InputComponents from "../General/InputComponents";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { storage } from "../../lib/firebase"; // Firebase config dosyasını import edin
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateForm = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const categoryList = [
    {
      name: "Bilgisayar",
      icon: FaComputer,
    },
    {
      name: "Ayakkabı",
      icon: TbShoe,
    },
    {
      name: "Tablet",
      icon: FaTablet,
    },
    {
      name: "Gözlük",
      icon: FaGlasses,
    },
    {
      name: "Tshirt",
      icon: FaShirt,
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      image: "",
      inStock: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleUploadComplete = (res: Array<{ name: string, url: string }>) => {
    console.log("Upload result:", res);  // Konsola yazdır
    if (res && res.length > 0) {
      const fileUrl = res[0].url;
      const fileName = res[0].name;  // Dosya adını al

      // Fetch the file blob from the URL
      fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          const storageRef = ref(storage, `images/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
              console.error("Upload error:", error);
              alert(`ERROR! ${error.message}`);
            }, 
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setCustomValue("image", downloadURL);
                setUploadedFileName(fileName);
              });
            }
          );
        })
        .catch(error => {
          console.error("Fetch error:", error);
          alert(`ERROR! ${error.message}`);
        });
    }
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);  // Hata detaylarını konsola yazdır
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div className="flex flex-col gap-5 w-1/2">
      <Heading text="ÜRÜN OLUŞTUR" center />
      <div className="text-black flex flex-col gap-5">
        <InputComponents
          placeholder="Ad"
          type="text"
          id="name"
          register={register}
          errors={errors}
          required
        />
        <InputComponents
          placeholder="Açıklama"
          type="text"
          id="description"
          register={register}
          errors={errors}
          required
        />
        <InputComponents
          placeholder="Marka"
          type="text"
          id="brand"
          register={register}
          errors={errors}
          required
        />
        <InputComponents
          placeholder="Fiyat"
          type="number"
          id="price"
          register={register}
          errors={errors}
          required
        />
        <CheckboxComponent
          id="inStock"
          label="Ürün stokta mevcut mu?"
          register={register}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryList.map((cat) => (
            <ChoiceInput
              key={cat.name}
              icon={cat.icon}
              text={cat.name}
              onClick={(category) => setCustomValue("category", category)}
              selected={category == cat.name}
            />
          ))}
        </div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />
        {uploadedFileName && (
          <div className="mt-2 text-green-600">
            Yüklenen dosya: {uploadedFileName}
          </div>
        )}
        <Button variant={"active"} onClick={handleSubmit(onSubmit)}>
          Ürün Oluştur
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;
