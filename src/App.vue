<template>
	<div id="app">
		<!-- <FileUpload /> -->
		<router-view />
	</div>
</template>

<script>
import FileUpload from "./components/file.vue";

export default {
	name: "App",
	components: {
		FileUpload,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 0px;
}
</style>
