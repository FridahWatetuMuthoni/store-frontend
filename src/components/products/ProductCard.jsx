import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "../ui/dialog";
import { toaster, Toaster } from "../ui/toaster";

import { useTheme } from "next-themes";
import { useState } from "react";
import useProductStore from "../../store/products";

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();

  const textColor = theme === "dark" ? "gray.200" : "gray.600";
  const bg = theme === "dark" ? "gray.800" : "white";

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toaster.create({
      description: message,
      type: success ? "success" : "error",
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    toaster.create({
      description: message,
      type: success ? "success" : "error",
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h2" size="md" mb={2} textTransform="capitalize">
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button
                variant="subtle"
                colorPalette="blue"
                aria-label="Update product"
              >
                <FaRegEdit size={25} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button
                    color="blue"
                    mr={3}
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Update
                  </Button>
                </DialogActionTrigger>

                <DialogActionTrigger asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogActionTrigger>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
          <Button
            variant="subtle"
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
            aria-label="Delete product"
          >
            <MdDeleteForever size={30} />
          </Button>
        </HStack>
      </Box>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
