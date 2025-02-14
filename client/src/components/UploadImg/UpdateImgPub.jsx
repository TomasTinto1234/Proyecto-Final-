import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { imgUpload, deletePublicactionImage } from "../../redux/actions/index";
import { Flex, Input, Button, Image, Text, FormLabel, Box } from "@chakra-ui/react";
import { useEffect } from "react";

export default function UpdateImgPub({ setInfoFormProp, infoFormProp }) {
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();
  const [disableButtonUploadImg, setDisableButtonUploadImg] = useState(true);

  useEffect(() => {
    if (infoFormProp.propImg.length >= 7) {
      setDisableButtonUploadImg(true);
    } else {
      setDisableButtonUploadImg(false);
    }
  }, [infoFormProp.propImg.length, setDisableButtonUploadImg]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const upload = () => {
    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("upload_preset", "czwgzdiw");

    axios
      .post("https://api.cloudinary.com/v1_1/lookhouse/image/upload", formData)
      .then((resp) => {
        dispatch(imgUpload({ url: resp.data.secure_url, cloudId: resp.data.public_id }));
        setInfoFormProp({
          ...infoFormProp,
          propImg: [
            ...infoFormProp.propImg,
            { url: resp.data.secure_url, cloudId: resp.data.public_id },
          ],
        });
        setSuccessMsg("Image uploaded successfully");
      })
      .catch((err) => console.log(err))
      .finally(
        setFileInput(""),
        setPreview(""),
        setTimeout(() => {
          setSuccessMsg("");
        }, 2000)
      );
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      previewFile(file);
      setFileInput(event.target.files[0]);
    }
  };
  const deleteImg = (id) => {
    dispatch(deletePublicactionImage({ id }));
    let nonDeleted = infoFormProp.propImg.filter((img) => img.cloudId !== id);
    setInfoFormProp({ ...infoFormProp, propImg: [...nonDeleted] });
  };

  return (
    <Flex
      border={"2px"}
      gap={"0.6rem"}
      borderColor={"gray.200"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      position={"relative"}
      p=".9rem"
    >
      <Text
        alignSelf={"flex-start"}
        ml="4%"
        fontWeight={"semiBold"}
        fontSize="1.2rem"
        color="gray.500"
      >
        Imágenes
      </Text>

      <Flex
        flexDirection={"column"}
        w={"92%"}
        border={"2px"}
        gap={"2rem"}
        borderColor={"gray.200"}
        p={"1.4rem"}
      >
        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"25rem"}>
          {preview ? (
            <Image maxH={"98%"} src={preview} alt="chosen" />
          ) : successMsg ? (
            <Text>{successMsg}</Text>
          ) : (
            <Text color={"gray.500"}>Ningún archivo seleccionado...</Text>
          )}
        </Flex>
      </Flex>

      <FormLabel
        display={"flex"}
        alignItems={"center"}
        alignSelf={"center"}
        w={"95%"}
        border={"2px"}
        borderColor={"gray.200"}
        p={".7rem"}
        justifyContent={"center"}
      >
        <Input
          mt={".6rem"}
          color={"gray.600"}
          id={"inputFile"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          accept=".jpg, .jpeg, .png, .webp"
          border={"none"}
          type="file"
          onChange={(e) => handleChange(e)}
        />
        <Button
          disabled={disableButtonUploadImg}
          colorScheme="blue"
          value={"Cargar"}
          onClick={upload}
        >
          Agregar
        </Button>
      </FormLabel>

      <Flex
        id="seletedImgs"
        minH={"7rem"}
        flexWrap={"wrap"}
        w={"95%"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        border={"2px"}
        borderColor={"gray.200"}
        p="1rem"
        gap={"0.8rem"}
      >
        {infoFormProp.propImg?.map((img, index) => (
          <Box key={index}>
            <Image src={img.url} alt={index} key={index} h={"4rem"} />
            <Button onClick={() => deleteImg(img.cloudId)}>X</Button>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
