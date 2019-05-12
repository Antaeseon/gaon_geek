<template>
  <div class="App"/>
</template>

<script>
import MarkerClusterer from '@google/markerclusterer';
import store from './../store'
import gmapsInit from './../utils/gmaps';

const locations = [
  {
    position: {
      lat: 48.160910,
      lng: 16.383330,
    },
  },
  {
    // 서울
    position: {
      lat: 37.541,
      lng: 126.986,
    },
  },
  {
    position: {
      lat: 48.146140,
      lng: 16.297030,
    },
  },
  {
    position: {
      lat: 48.135830,
      lng: 16.194460,
    },
  },
  {
    position: {
      lat: 48.306091,
      lng: 14.286440,
    },
  },
  {
    position: {
      lat: 47.503040,
      lng: 9.747070,
    },
  }
];

export default {
  name: `App`,
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);
      // var jong = data.location
      // var loc = store.state.sellerInfo.location
      geocoder.geocode({ address: 'Korea' }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }
        // data.lat = results[0].geometry.location
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      const markerClickHandler = (marker) => {
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      };

      const markers = locations
        .map((location) => {
          const marker = new google.maps.Marker({ ...location, map });
          marker.addListener(`click`, () => markerClickHandler(marker));

          return marker;
        });

      // eslint-disable-next-line no-new
      new MarkerClusterer(map, markers, {
        imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 100vw;
  height: 100vh;
}
</style>
