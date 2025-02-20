import React, { useEffect, useState } from "react";
import { Box, VStack, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaUsers, FaPizzaSlice, FaPlus, FaClipboardList } from "react-icons/fa";
import Addpizza from "../components/admin/Addpizza";
import Allorders from "../components/admin/Allorders";
import Allusers from "../components/admin/Allusers";
import Allpizza from "../components/admin/Allpizza";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("all-users");

  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");
  const buttonHoverText = useColorModeValue("white", "black");
  const buttonActiveBg = useColorModeValue("blue.700", "blue.400");
  const buttonActiveText = useColorModeValue("white", "black");
  const sidebarBg = useColorModeValue("blue.50", "blue.700");
  const mainBg = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.50", "gray.900");

  useEffect(() => {
    const userf = localStorage.getItem("auth");
    console.log(userf.user);
    if (userf?.user?.isAdmin) {
      navigate("/");
    }
  }, []);

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <Box display="flex" height="100vh" width="100%" p={4} bg={pageBg}>
      <Box width="200px" bg={sidebarBg} p={4} borderRadius="md" shadow="md">
        <VStack spacing={4} align="stretch">
          <Button
            leftIcon={<Icon as={FaUsers} />}
            colorScheme="blue"
            variant={currentView === "all-users" ? "solid" : "outline"}
            onClick={() => handleNavigation("all-users")}
            _hover={{
              bg: buttonHoverBg,
              color: buttonHoverText,
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            }}
            _active={{
              bg: buttonActiveBg,
              color: buttonActiveText,
            }}
          >
            All Users
          </Button>
          <Button
            leftIcon={<Icon as={FaPizzaSlice} />}
            colorScheme="blue"
            variant={currentView === "all-pizza" ? "solid" : "outline"}
            onClick={() => handleNavigation("all-pizza")}
            _hover={{
              bg: buttonHoverBg,
              color: buttonHoverText,
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            }}
            _active={{
              bg: buttonActiveBg,
              color: buttonActiveText,
            }}
          >
            All Pizza
          </Button>
          <Button
            leftIcon={<Icon as={FaPlus} />}
            colorScheme="blue"
            variant={currentView === "add-pizza" ? "solid" : "outline"}
            onClick={() => handleNavigation("add-pizza")}
            _hover={{
              bg: buttonHoverBg,
              color: buttonHoverText,
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            }}
            _active={{
              bg: buttonActiveBg,
              color: buttonActiveText,
            }}
          >
            Add Pizza
          </Button>
          <Button
            leftIcon={<Icon as={FaClipboardList} />}
            colorScheme="blue"
            variant={currentView === "all-orders" ? "solid" : "outline"}
            onClick={() => handleNavigation("all-orders")}
            _hover={{
              bg: buttonHoverBg,
              color: buttonHoverText,
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            }}
            _active={{
              bg: buttonActiveBg,
              color: buttonActiveText,
            }}
          >
            All Orders
          </Button>
        </VStack>
      </Box>
      <Box flex="1" p={6} ml={4} bg={mainBg} borderRadius="md" shadow="md">
        {currentView === "all-users" && <Allusers  />}
        {currentView === "all-pizza" && <Allpizza />}
        {currentView === "add-pizza" && <Addpizza />}
        {currentView === "all-orders" && <Allorders />}
      </Box>
    </Box>
  );
};

export default Admin;
