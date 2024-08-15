"use client";
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
import InputComponents from "../General/InputComponents";
import CheckboxComponent from "../General/Checkbox";
import ChoiceInput from "../General/ChoiceInput";
import Button from "../General/Button";
import { firebaseApp } from "@/lib/firebase";
import { FaTshirt } from "react-icons/fa";
import { IoGlasses } from "react-icons/io5";
import { TbShoe } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { RiShirtFill } from "react-icons/ri";
import { FaArrowLeft, FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import Link from "next/link";
import { Input } from "../ui/input";
import { GiElectric } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { IoPencil } from "react-icons/io5";
import { FaCar } from "react-icons/fa6";
import { FaBaby } from "react-icons/fa";
import { MdOutlineSportsTennis } from "react-icons/md";
import { GiComb } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { FaBook } from "react-icons/fa";

const CreateForm = () => {
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();

  const categoryList = [
    {
      name: "Elektronik",
      icon: GiElectric,
    },
    {
      name: "Giyim",
      icon: TbShoe,
    },
    {
      name: "Ev-Esyalari",
      icon: TiHome,
    },
    {
      name: "Kirtasiye",
      icon: IoPencil,
    },
    {
      name: "Oto",
      icon: FaCar,
    },
    {
      name: "Bebek",
      icon: FaBaby,
    },
    {
      name: "Spor",
      icon: MdOutlineSportsTennis,
    },
    {
      name: "Kisisel-Bakim",
      icon: GiComb,
    },
    {
      name: "Pet",
      icon: MdOutlinePets,
    },
    {
      name: "Kitap",
      icon: FaBook,
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
        toast({ title: "Lütfen bir resim seçin." });
        return;
      }

      toast({ title: "Resim başarıyla yüklendi." });
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
      toast({ title: "Resim yüklenemedi." });
      return;
    }

    let newData = { ...data, image: uploadedImg };

    axios
      .post("/api/product", newData)
      .then(() => {
        toast({ title: "Ürün başarıyla eklendi." });
        router.refresh();
        window.location.reload();
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
    <div className="w-1/2">
      <span className="absolute left-10 text-white">
        <Link href={"/admin"}>
          <FaArrowLeft size={30} />
        </Link>
      </span>
      <h1 className="text-center text-2xl font-bold text-white">ÜRÜN EKLE</h1>
      <div className="flex flex-col">
        <InputComponents
          adminui
          placeholder="Ad"
          type="text"
          id="name"
          register={register}
          errors={errors}
          required
        />
        <InputComponents
          adminui
          placeholder="Acıklama"
          type="text"
          id="description"
          register={register}
          errors={errors}
          required
        />
        <InputComponents
          adminui
          placeholder="Marka"
          type="text"
          id="brand"
          register={register}
          errors={errors}
          required
        />
        <InputComponents
          adminui
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
      </div>
      <div className="grid grid-cols-3 gap-5">
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
      <Input className="my-5" type="file" onChange={onChangeFunc} />
      <Button text="Ekle" whiteColor onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export default CreateForm;
