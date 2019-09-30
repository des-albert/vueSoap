<template>
  <div class="container">
    <div class="row">
      <!--
            Tasks
      -->
      <h2 class="text-info">
        Opportunities in SOPS Control
      </h2>
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th @click="sort('Name')">
              Name
            </th>
            <th @click="sort('TaskStatus')">
              Status
            </th>
            <th @click="sort('TaskDueDate')">
              Due Date
            </th>
            <th @click="sort('Qualified_Quote__c')">
              Qualified Quote
            </th>
            <th @click="sort('Primary_Quote_Status__c')">
              Primary Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="opp in sortedOpps"
            :key="opp.OppId"
          >
            <td>
              <a :href="`https://cray.my.salesforce.com/${opp.Id}`">
                {{ opp.Name }}
              </a>
            </td>
            <td>{{ opp.TaskStatus }}</td>
            <td>{{ opp.TaskDueDate }}</td>
            <td>{{ opp.Qualified_Quote__c }}</td>
            <td>{{ opp.Primary_Quote_Status__c }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opportunities: [],
      currentSort:'name',
      currentSortDir:'asc'
    };
  },
  computed:{
    sortedOpps:function() {
      return this.opportunities.slice().sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  },
  created() {

    // Populate sopsTasks

    let uri = '/sopsTasks';
    if (process.env.NODE_ENV !== 'production') {
      uri = 'http://localhost:4000/sopsTasks';
    }
    this.axios.get(uri, {withCredentials: true})
      .then(() => {

        // Populate sopsOpps

        uri = '/sopsOpps';
        if (process.env.NODE_ENV !== 'production') {
          uri = 'http://localhost:4000/sopsOpps';
        }
        this.axios.get(uri, {withCredentials: true})
          .then(() => {

            // Summary

            uri = '/sops';
            if (process.env.NODE_ENV !== 'production') {
              uri = 'http://localhost:4000/sops';
            }
            this.axios.get(uri, {withCredentials: true})
              .then(response => {
                this.opportunities = response.data;
              })
              .catch(() => {
                console.log('get summary catch');
              });
          })
          .catch(() => {
            console.log('get sopsOpps catch');
          });
      })
      .catch(() => {
        console.log('get sopsTasks catch');
      });
  },
  methods: {
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
  }
};
</script>
