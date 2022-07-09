<template>
  <div>
    <div class="pages">
      <v-btn v-on:click="sortNames"
        >Отсортировать вещи по названию в алфавитном порядке</v-btn
      >
    </div>
    <v-btn v-if="!isFives" v-on:click="filterByPrice"
      >Отобразить только вещи с ценой больше 10000</v-btn
    >
    <v-btn v-if="isFives" v-on:click="show">Отобразить все</v-btn>
    <ul>
      <Order v-bind:clothes="clothes" />
    </ul>
    <div class="pages">
      <v-btn v-on:click="prev">Предыдущая</v-btn>
      <v-btn v-on:click="next">След страница</v-btn>
    </div>
    <v-btn v-on:click="drop">Сбросить сортировку и фильтр</v-btn>
  </div>
</template>

<script>
import Order from "@/components/Order";

export default {
  data() {
    return {
      isFives: false,
    };
  },
  components: { Order },
  async fetch({ store }) {
    if (store.getters["her/clothes"].length === 0) {
      await store.dispatch("her/fetch");
    }
  },
  computed: {
    clothes() {
      return this.$store.getters["her/clothes"];
    },
  },
  methods: {
    async show() {
      this.isFives = !this.isFives;
      await this.$store.dispatch("her/fetch");
    },
    async filterByPrice() {
      this.isFives = !this.isFives;
      await this.$store.dispatch(
        "her/filterByPrice",
        this.$store.getters["her/clothes"]
      );
    },
    async next() {
      const next = this.$store.getters["her/next"];
      if (next) {
        this.$store.dispatch("her/fetchNext", next);
      } else {
        alert("Следующей страницы нет");
      }
    },
    async prev() {
      const prev = this.$store.getters["her/prev"];
      if (prev) {
        this.$store.dispatch("her/fetchPrev", prev);
      } else {
        alert("Предыдущей страницы нет");
      }
    },
    async sortNames() {
      await this.$store.dispatch("her/fetchAll");
      const clothes = this.$store.getters["her/clothes"];
      await this.$store.dispatch("her/sortByNames", clothes);
    },
    async drop() {
      this.isFives = false;
      await this.$store.dispatch("her/fetch");
    },
  },
};
</script>

<style>
.pages {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
