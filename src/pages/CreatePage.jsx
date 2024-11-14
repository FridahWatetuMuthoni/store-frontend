import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import useProductStore from "../store/products";
import { toaster, Toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "gray.800" : "white";
  const isDark = theme === "dark";
  const { createProduct } = useProductStore();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toaster.create({
        description: message,
        type: "success",
      });
    } else {
      toaster.create({
        description: message,
        type: "error",
      });
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
    return navigate("/");
  };

  return (
    <Container maxW={"2xl"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box bg={bgColor} w={"full"} p={"6"} rounded={"lg"} shadow={"md"}>
          <VStack spacing={6}>
            <Input
              border="1px solid"
              borderColor={isDark ? "gray.500" : "gray.300"} // Apply dark mode border color
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              type="number"
              name="price"
              border="1px solid"
              borderColor={isDark ? "gray.500" : "gray.300"} // Apply dark mode border color
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              border="1px solid"
              borderColor={isDark ? "gray.500" : "gray.300"} // Apply dark mode border color
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </VStack>
          <Button
            bg="cyan.400"
            bgGradient={"to-r"}
            marginTop={5}
            onClick={handleAddProduct}
            w="full"
          >
            Add Product
          </Button>
          <Toaster />
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
