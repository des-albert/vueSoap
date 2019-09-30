<template>
  <div class="container">
    <div class="row">
      <!--
            Tasks
      -->
      <h2 class="text-info">
        Exception Tasks
      </h2>
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th @click="sort('ExceptionNumber')">
              Number
            </th>
            <th @click="sort('Name')">
              Description
            </th>
            <th @click="sort('Subject')">
              Subject
            </th>
            <th @click="sort('Status')">
              Status
            </th>
            <th @click="sort('Exception_Agile_ECO_MCO__c')">
              Change Number
            </th>
            <th @click="sort('ECO_MCO_status')">
              Change Status
            </th>
            <th @click="sort('OpportunityName')">
              Opportunity
            </th>
            <th @click="sort('CustomCodes')">
              Codes
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in sortedTasks"
            :key="task.Id"
          >
            <template>
              <td>{{ task.ExceptionNumber }}</td>
              <td>
                <a :href="`https://cray.my.salesforce.com/${task.ExceptionId}`">
                  {{ task.Name }}
                </a>
              </td>
              <td>{{ task.Subject }}</td>
              <td>{{ task.Status }}</td>
              <td>{{ task.Exception_Agile_ECO_MCO__c }}</td>
              <td>{{ task.ECO_MCO_status }}</td>
              <td>{{ task.OpportunityName }}</td>
              <td>{{ task.CustomCodes }}</td>
              <td>
                <button
                  class="btn btn-warning"
                  @click.prevent="taskComplete( task.Id )"
                >
                  Complete
                </button>
              </td>
            </template>
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
      tasks: [],
      currentSort: 'name',
      currentSortDir: 'asc'
    };
  },
  computed: {
    sortedTasks: function () {
      return this.tasks.slice().sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  },
  created() {
    // Populate Tasks
    let uri = '/task';
    if (process.env.NODE_ENV !== 'production') {
      uri = 'http://localhost:4000/task';
    }
    this.axios.get(uri, {withCredentials: true})
      .then(() => {
        // Populate Exceptions
        uri = '/exception';
        if (process.env.NODE_ENV !== 'production') {
          uri = 'http://localhost:4000/exception';
        }
        this.axios.get(uri, {withCredentials: true})
          .then(() => {
            // Populate Opportunities
            uri = '/opportunity';
            if (process.env.NODE_ENV !== 'production') {
              uri = 'http://localhost:4000/opportunity';
            }
            this.axios.get(uri, {withCredentials: true})
              .then(() => {
                //  Retrieve Agile Change Status
                uri = '/agile';
                if (process.env.NODE_ENV !== 'production') {
                  uri = 'http://localhost:4000/agile';
                }
                this.axios.get(uri, {withCredentials: true})
                  .then(() => {
                    // Summary
                    uri = '/summary';
                    if (process.env.NODE_ENV !== 'production') {
                      uri = 'http://localhost:4000/summary';
                    }
                    this.axios.get(uri, {withCredentials: true})
                      .then(response => {
                        this.tasks = response.data;
                      })
                      .catch(() => {
                        console.log('get summary catch');
                      });
                  })
                  .catch(() => {
                    console.log('get agile catch');
                  });
              })
              .catch(() => {
                console.log('get opportunity catch');
              });
          })
          .catch(() => {
            console.log('get exception catch');
          });
      })
      .catch(() => {
        console.log('get task catch');
      });
  },
  methods: {
    taskComplete(taskId) {
      let uri = `/task/update/${taskId}`;
      if (process.env.NODE_ENV !== 'production') {
        uri = `http://localhost:4000/task/update/${taskId}`;
      }
      this.axios.post(uri, taskId, {withCredentials: true})
        .then(() => {
          this.$router.push({name: 'exceptions'});
          location.reload();
        })
        .catch(() => {
        });
    },
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    }
  }
};
</script>
