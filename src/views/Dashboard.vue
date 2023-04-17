<template>
  <div>
    <form @submit.prevent="selectedCar ? updateCar() : createCar()" class="mt-4">
      <label>ID</label>
      <input disabled type="number" v-model="car.id" class="form-control"/>
      <br />
      <label class="block mb-2 mt-2 text-sm font-medium">Discord MSG ID</label>
      <input type="text" v-model="car.discord_message_id" placeholder="Number" class="form-control" />
      <br />
      <label class="block mb-2 mt-2 text-sm font-medium">Name</label>
      <input type="text" v-model="car.name" class="form-control" placeholder="Avanza"/>
      <br />
      <label>Price</label>
      <input type="number" v-model="car.price" class="form-control" />
      <br />
      <label>Type</label>
      <input type="text" v-model="car.type" class="form-control" />
      <br />
      <label>HP</label>
      <input type="number" v-model="car.hp" class="form-control" />
      <br />
      <label>Gas Tank</label>
      <input type="number" v-model="car.gas_tank" class="form-control" />
      <br />
      <button class="btn btn-primary" type="submit">{{ selectedCar ? 'Update' : 'Create' }}</button>   
 </form>
    <br />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Discord Message ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Type</th>
          <th>HP</th>
          <th>Gas Tank</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.discord_message_id }}</td>
          <td>{{ car.name }}</td>
          <td>{{ car.price }}</td>
          <td>{{ car.type }}</td>
          <td>{{ car.hp }}</td>
          <td>{{ car.gas_tank }}</td>
          <td>
            <button class="btn btn-primary mr-2 btn-sm" type="button" @click="editCar(car)">Edit</button>
            <button class="btn btn-danger btn-sm" type="button" @click="deleteCar(car)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cars: [],
      car: {
        id: null,
        discord_message_id: null,
        name: null,
        price: null,
        type: null,
        hp: null,
        gas_tank: null
      },
      selectedCar: null
    };
  },
  mounted() {
    this.getCars();
  },
  methods: {
    getCars() {
      axios.get("https://api.projectzomboid.id/api/smuggler/vehicles")
        .then(response => {
          this.cars = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    createCar() {
      axios.post("https://api.projectzomboid.id/api/smuggler/vehicles", this.car)
        .then(response => {
          this.cars.push(response.data);
          this.car.id = null;
          this.car.discord_message_id = null;
          this.car.name = null;
          this.car.price = null;
          this.car.type = null;
          this.car.hp = null;
          this.car.gas_tank = null;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editCar(car) {
      this.selectedCar = car
      this.car.id = car.id;
      this.car.discord_message_id = car.discord_message_id;
      this.car.name = car.name;
      this.car.price = car.price;
      this.car.type = car.type;
      this.car.hp = car.hp;
      this.car.gas_tank = car.gas_tank;
    },
    updateCar() {
      axios.put("https://api.projectzomboid.id/api/smuggler/vehicles/" + this.selectedCar.id, this.car)
        .then(response => {
          const index = this.cars.findIndex(car => car.id === response.data.id);
          this.cars.splice(index, 1, response.data);
          this.car.id = null;
          this.car.discord_message_id = null;
          this.car.name = null;
          this.car.price = null;
          this.car.type = null;
          this.car.hp = null;
          this.car.gas_tank = null;
          this.selectedCar = null;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteCar(car) {
      axios.delete("https://api.projectzomboid.id/api/smuggler/vehicles/" + car.id)
        .then(response => {
          const index = this.cars.findIndex(c => c.id === car.id);
          this.cars.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
