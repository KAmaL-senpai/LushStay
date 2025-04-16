const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/practice");
}
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((e) => {
    console.log(`Error : ${e}`);
  });

  const initDB=async()=>{
    await Listing.insertMany(initData.data);
    console.log("Data Gone!");
  }

  initDB();
// const DEFAULT_CATEGORY = "rooms"; // Set your default category
// const FRANCE_GEOMETRY = {
//   type: "Point",
//   coordinates: [1.888334, 46.603354], // France's center coordinates
// };

// const initDB = async () => {
//   await Listing.updateMany(
//     { category: { $exists: false } },
//     { $set: { category: DEFAULT_CATEGORY } }
//   );

//   await Listing.updateMany(
//     { geometry: { $exists: false } },
//     { $set: { geometry: FRANCE_GEOMETRY } }
//   );

//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     category: obj.category || DEFAULT_CATEGORY,
//     geometry: obj.geometry || FRANCE_GEOMETRY,

//   }));

//   await Listing.insertMany(initData.data);
//   console.log("Done");
// };

// initDB();




// const NEW_IMAGE_URL = "https://br.web.img2.acsta.net/pictures/19/12/19/19/35/2432972.jpg";

// const updateImages = async () => {
//   await Listing.updateMany({}, { 
//     image: { 
//       url: NEW_IMAGE_URL, 
//       filename: "custom_image"
//     }
//   });

//   console.log("All listing images have been updated!");
//   mongoose.connection.close();
// };

// updateImages();