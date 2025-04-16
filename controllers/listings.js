const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index Route
module.exports.index = async (req, res) => {
  const { category, location } = req.query;
  let filter = {};

  // Handle category filtering
  if (category) {
    const categories = category.split(",");
    filter.category = { $in: categories };
  }

  // Handle location search
  // Search on both location and country
  if (location) {
    const regex = new RegExp(location, "i"); // case-insensitive
    filter.$or = [
      { location: { $regex: regex } },
      { country: { $regex: regex } },
    ];
  }

  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", { allListings, query: req.query });
};

//New Form Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//Show Route
module.exports.showRoute = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

//Post Route for New listing
module.exports.postRouteListing = async (req, res) => {
  let coordinates = await geocodingClient
    .forwardGeocode({
      query: `${req.body.listing.location},${req.body.listing.country}`,
      limit: 1,
    })
    .send();

  const url = req.file.path;
  const filename = req.file.filename;
  console.log("Listing body:", req.body.listing);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = coordinates.body.features[0].geometry;
  let saveListing = await newListing.save();
  console.log(saveListing);
  req.flash("success", "New Listing Added!");
  res.redirect("/listings");
};

//Edit Route
module.exports.editRoute = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    res.redirect("/listings");
  }
  let orginalImageUrl = listing.image.url;
  orginalImageUrl = orginalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, orginalImageUrl });
};

//Update Route
module.exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//Delete Route
module.exports.deleteRoute = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("error", "Listing Deleted!");
  res.redirect("/listings");
};
