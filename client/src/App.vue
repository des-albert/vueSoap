<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarColor01"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav mr-auto">
          <li>
            <img src="./assets/Cray_HPE_small.png">
          </li>
          <li class="nav-item">
            <router-link
              to="/opportunities"
              class="nav-link"
            >
              Opportunities
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/exceptions"
              class="nav-link"
            >
              Exceptions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link"
            >
              About
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav navbar-right">
          <div v-if="$store.getters.user">
            <li class="nav-item">
              <router-link
                to="/login"
                class="nav-link"
              >
                <div v-if="$store.getters.user.includes('failed')">
                  <span class="blinking"> {{ $store.getters.user }} </span>
                </div>
                <div v-else>
                  Current User: {{ $store.getters.user }}
                </div>
              </router-link>
            </li>
          </div>
          <div v-else>
            <li class="nav-item">
              <router-link
                to="/login"
                class="nav-link"
              >
                Login
              </router-link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    <transition
      name="bounce"
    >
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
};
</script>
<style scoped>

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  .bg-custom {
  background-color: #2d738f;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .blinking{
    animation:blinkingText 0.8s infinite;
  }

  @keyframes blinkingText{
    0%{     color: #000;    }
    49%{    color: transparent; }
    50%{    color: transparent; }
    99%{    color: transparent;  }
    100%{   color: #000;    }
  }
</style>
