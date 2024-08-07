"use client";
import { FaComputer } from "react-icons/fa6";
import { GiBallerinaShoes } from "react-icons/gi";
import { FaTabletAlt } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Heading from "../General/Heading";
import InputComponents from "../General/InputComponents";
import CheckboxComponent from "../General/Checkbox";
import ChoiceInput from "../General/ChoiceInput";
import Button from "../General/Button";
import { firebaseApp } from "@/lib/firebase";

const CreateForm = () => {
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();

  const categoryList = [
    {
      name: "Bilgisayar",
      icon: FaComputer,
    },
    {
      name: "Ayakkabı",
      icon: GiBallerinaShoes,
    },
    {
      name: "Tablet",
      icon: FaTabletAlt,
    },
    {
      name: "Mikrofon",
      icon: CiMicrophoneOn,
    },
    {
      name: "Ayakkabı1",
      icon: FaComputer,
    },
    {
      name: "Ayakkabı2",
      icon: FaComputer,
    },
  ];

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    let uploadedImg;

    const handleChange = async () => {
      if (!img) {
        toast({ title: "Lütfen bir resim seçin" });
        return;
      }

      toast({ title: "yükleme işlemi başarılı" });
      try {
        const storage = getStorage(firebaseApp);
        const uniqueFileName = `${uuidv4()}_${img.name}`;
        const storageRef = ref(storage, `images/${uniqueFileName}`);

        const uploadTask = uploadBytesResumable(storageRef, img);
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  console.log("File available at", downloadURL);
                  uploadedImg = downloadURL;
                  resolve();
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          );
        });
      } catch (error) {
        console.log(error);
      }
    };

    await handleChange();

    if (!uploadedImg) {
      toast({ title: "Resim yüklenemedi" });
      return;
    }

    let newData = { ...data, image: uploadedImg };

    axios
      .post("/api/product", newData)
      .then(() => {
        toast({ title: "yükleme işlemi başarılı" });
        router.refresh();
      })
      .catch((error) => {
        console.log(error, "error");
      });

    console.log(newData, "NEWDATAAAA");
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  return (
    <div className="text-black">
      <Heading text="ÜRÜN OLUSTUR" center />
      <InputComponents
        placeholder="Ad"
        type="text"
        id="name"
        register={register}
        errors={errors}
        required
      />
      <InputComponents
        placeholder="Acıklama"
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
        label="Ürün Stokta Mevcut mu ?"
        register={register}
      />
      <div className="flex flex-wrap gap-3">
        {categoryList.map((cat, i) => (
          <ChoiceInput
            key={i}
            icon={cat.icon}
            text={cat.name}
            onClick={(category) => setCustomValue("category", category)}
            selected={category == cat.name}
          />
        ))}
      </div>
      <input className="mb-2" type="file" onChange={onChangeFunc} />
      <Button text="Ürün Olustur" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export default CreateForm;
