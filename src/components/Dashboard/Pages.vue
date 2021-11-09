<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
        <b-nav-item to="/dashboard/pages/">About</b-nav-item>
        <b-nav-item to="/dashboard/pages/simulator">Simulator</b-nav-item>
        <b-nav-item to="/dashboard/pages/gb3">GB3</b-nav-item>
        <b-nav-item to="/dashboard/pages/gb4">GB4</b-nav-item>
        <b-nav-item to="/dashboard/pages/f4brit">F4 British</b-nav-item>
        <b-nav-item to="/dashboard/pages/f4uae">F4 UAE</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>