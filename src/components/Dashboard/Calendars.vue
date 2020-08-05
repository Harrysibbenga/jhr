<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
        <b-nav-item to="/dashboard/calendars/">F3 Calendar</b-nav-item>
        <b-nav-item to="/dashboard/calendars/f4">F4 Calendar</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>
