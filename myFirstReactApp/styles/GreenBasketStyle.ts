import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FAF5",
    paddingTop: 40,
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
  },

  subtitle: {
    fontSize: 12,
    color: "#4E6E5D",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2E7D32",
  },

  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#C62828",
  },

  productCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#FAFAFA",
  },

  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 5,
  },

  smallButton: {
    marginTop: 10,
    backgroundColor: "#388E3C",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },

  smallButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default styles;