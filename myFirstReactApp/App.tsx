import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/GreenBasketStyle";

export default function App() {
  const handleClick = (label: string) => {
    console.log(`${label} clicked`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>🌿 GreenBasket</Text>
        <Text style={styles.subtitle}>
          Direct Farm-to-Customer Marketplace (Nepal)
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>👤 Profile</Text>
          <Text style={styles.text}>Name: Prija</Text>
          <Text style={styles.text}>Role: Customer / Farmer</Text>
          <Text style={styles.text}>Location: Kathmandu</Text>
        </View>

        {/* Dashboard Actions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📊 Dashboard</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleClick("Browse Products")}
          >
            <Text style={styles.buttonText}>🌾 Browse Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleClick("My Orders")}
          >
            <Text style={styles.buttonText}>🛒 My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleClick("Saved Items")}
          >
            <Text style={styles.buttonText}>❤️ Saved Items</Text>
          </TouchableOpacity>
        </View>

        {/* Product Preview */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🌾 Fresh Products</Text>

          <View style={styles.productCard}>
            <Text style={styles.productTitle}>Tomatoes</Text>
            <Text style={styles.text}>Rs. 80/kg</Text>
            <Text style={styles.text}>Location: Kavre</Text>
            <Text style={styles.text}>Harvest: 2 days ago</Text>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleClick("Price Request")}
            >
              <Text style={styles.smallButtonText}>
                💬 Request Price
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productCard}>
            <Text style={styles.productTitle}>Rice (Basmati)</Text>
            <Text style={styles.text}>Rs. 150/kg</Text>
            <Text style={styles.text}>Harvest Year: 2025</Text>
            <Text style={styles.text}>Region: Terai</Text>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleClick("Buy Rice")}
            >
              <Text style={styles.smallButtonText}>🛒 Buy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⚙️ Settings</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleClick("Settings")}
          >
            <Text style={styles.buttonText}>App Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => handleClick("Logout")}
          >
            <Text style={styles.buttonText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}




// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export default function App() {
//   const [cardColor, setCardColor] = useState("#3498db");

//   const changeColor = () => {
//     const randomColor =
//       "#" + Math.floor(Math.random() * 16777215).toString(16);
//     setCardColor(randomColor);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={[styles.card, { backgroundColor: cardColor }]}>
//         <Text style={styles.cardText}>React Native Card</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={changeColor}>
//         <Text style={styles.buttonText}>Change Color</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   card: {
//     width: 300,
//     height: 180,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 5,
//   },
//   cardText: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   button: {
//     backgroundColor: "#222",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
