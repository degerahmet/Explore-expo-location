# Reflection

## Why I Chose This API
I chose the OpenStreetMap Nominatim API because it is free, open, and does not require an API key for basic usage. It provides robust geocoding and place search capabilities, making it ideal for quickly finding points of interest like swimming pools based on geographic coordinates. This aligns well with the goal of building a location-based app that respects user privacy and is easy to set up for anyone.

## What Was Challenging
The main challenge was working with the Nominatim API's bounding box and query parameters to ensure relevant and accurate results near the user's location. Handling permissions and location fetching in a cross-platform way with Expo also required careful error handling and user feedback. Additionally, ensuring the UI updated responsively as data loaded or errors occurred was important for a good user experience.

## What I Might Add With More Time
With more time, I would:
- Add map integration (e.g., using react-native-maps) to visually display pool locations.
- Implement better error and edge-case handling (e.g., no results, API rate limits).
- Allow users to search for other types of places or filter results.
- Add persistent storage for favorite pools.
- Improve the UI/UX with animations and more detailed pool info (photos, ratings, etc.).
- Write unit and integration tests for reliability.

Overall, this project demonstrates how to combine device APIs and open data to create a useful, privacy-friendly location-based app.
