import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore()
  const toast = useToast();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true
    });
    setNewProduct({name: "", price: "", image: ""});
  };

  return <Container maxW={"container.sm"}>
    <Heading spacing={8} as={"h3"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
    <VStack spacing={8} as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
      <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
        <VStack spacing={4}>
          <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}></Input>
          <Input placeholder='Price' name='price' type='number' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}></Input>
          <Input placeholder='Image URL' name='image' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}></Input>
          <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>Add Product</Button>
        </VStack>
      </Box>
    </VStack>

  </Container>
}

export default CreatePage