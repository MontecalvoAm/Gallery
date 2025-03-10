import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

const Stacks = createNativeStackNavigator();
const { width } = Dimensions.get("window");

const productData = [
  {
    id: 1,
    image: require("../assets/images/product1.jpg"),
    label: "Paul George 1",
    description: "Description for product 1.",
  },
  {
    id: 2,
    image: require("../assets/images/product2.jpg"),
    label: "Harden Vol 4",
    description: "Description for product 2.",
  },
  {
    id: 3,
    image: require("../assets/images/product3.jpg"),
    label: "Lebron 20",
    description: "Description for product 3.",
  },
  {
    id: 4,
    image: require("../assets/images/product4.jpg"),
    label: "Luka 1",
    description: "Description for product 4.",
  },
  {
    id: 5,
    image: require("../assets/images/product5.jpg"),
    label: "Curry 11",
    description: "Description for product 5.",
  },
  {
    id: 6,
    image: require("../assets/images/product6.jpg"),
    label: "KD 13",
    description: "Description for product 6.",
  },
  {
    id: 7,
    image: require("../assets/images/product7.jpg"),
    label: "ANTA KAI 1",
    description: "Description for product 7.",
  },
  {
    id: 8,
    image: require("../assets/images/product8.jpg"),
    label: "RIGORER AR 1",
    description: "Description for product 8.",
  },
];
const productImages: { [key: number]: any } = {
  1: require("../assets/images/product1.jpg"),
  2: require("../assets/images/product2.jpg"),
  3: require("../assets/images/product3.jpg"),
  4: require("../assets/images/product4.jpg"),
  5: require("../assets/images/product5.jpg"),
  6: require("../assets/images/product6.jpg"),
  7: require("../assets/images/product7.jpg"),
  8: require("../assets/images/product8.jpg"),
};

const getProductImage = (item: number) => {
  return productImages[item] || require("../assets/images/default.png"); // Fallback image
};

const HomeScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Carousel
          loop
          width={width * 0.9}
          height={250}
          data={productData}
          scrollAnimationDuration={500}
          onProgressChange={(_, absoluteProgress) =>
            setCurrentIndex(Math.round(absoluteProgress))
          }
          renderItem={({ item }) => (
            <View style={styles.section}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.label}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.buttonText}>VIEW NEXT</Text>
        </TouchableOpacity>
        {/* Gallery Preview */}
        <Text style={styles.sectionTitle}>Gallery Preview</Text>
        <View style={styles.galleryPreview}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Image
              key={item}
              source={getProductImage(item)}
              style={styles.gridImage}
            />
          ))}
        </View>

        {/* Products Preview */}
        <Text style={styles.sectionTitle}>Products Preview</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.product}>
            <Image source={getProductImage(item)} style={styles.productImage} />
            <Text style={styles.productText}>Product {item}</Text>
          </View>
        ))}

        {/* View Next Button */}
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.buttonText}>VIEW NEXT</Text>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const GalleryScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Gallery</Text>
    <View style={styles.grid}>
      {productData.map((item) => (
        <Image key={item.id} source={item.image} style={styles.gridImage} />
      ))}
    </View>
    <View style={styles.navButtons}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={styles.buttonText}>PRODUCTS</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const ProductsScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Products</Text>
    {productData.map((item) => (
      <View key={item.id} style={styles.product}>
        <Image source={item.image} style={styles.productImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.productText}>{item.label}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.addTocart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    ))}
    <View style={styles.navButtons}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Text style={styles.buttonText}>GALLERY</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

export default function Index() {
  return (
    <>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stacks.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stacks.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerBackVisible: false,
          }}
        />
        <Stacks.Screen name="Gallery" component={GalleryScreen} />
        <Stacks.Screen name="Products" component={ProductsScreen} />
      </Stacks.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  section: { alignItems: "center", marginBottom: 20 },
  image: { width: 300, height: 200, borderRadius: 10, marginBottom: 10 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: { marginLeft: 8, marginBottom: 10 },
  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  addTocart: {
    backgroundColor: "blue",
    padding: 6,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  next: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridImage: { width: 160, height: 160, margin: 5, borderRadius: 10 },
  navButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  productImage: { width: 100, height: 100, marginRight: 15, borderRadius: 10 },
  productText: { fontSize: 16, fontWeight: "bold" },
  buttonSmall: { backgroundColor: "green", padding: 8, borderRadius: 5 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  galleryPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
