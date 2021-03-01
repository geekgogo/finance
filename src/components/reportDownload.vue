<template>
	<el-container>
		<el-header>
			<img style="height: 50px;" src="../assets/keying_logo.png" />
		</el-header>
		<el-container>
			<el-aside width="200px">
				<leftAside :activeValue="activeValue"></leftAside>
			</el-aside>
			<el-main>
				<div class="report">
					<el-form ref="reportForm" :model="reportForm" label-width="80px" label-position="left">
						<el-form-item label="日期" class="date">
							<el-date-picker
								v-model="reportForm.dateValue"
								type="month"
								value-format="yyyy-MM"
								placeholder="选择月"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="职能部门" class="department">
							<el-select v-model="reportForm.departmentValue" @change="getBrand" placeholder="请选择职能部门">
								<el-option
									v-for="item in reportForm.department"
									:key="item.index"
									:label="item.label"
									:value="item.label"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="选项" class="options">
							<el-cascader
								v-model="reportForm.optionsValue"
								ref="myCascader"
								placeholder="试试搜索"
								:options="reportForm.options"
								:key="key1"
								:props="{ multiple: true }"
								filterable
							></el-cascader>
						</el-form-item>
					</el-form>
					<el-button type="primary" @click="startDownload">下载报表</el-button>
					<div style="margin-top: 20px; color: green; white-space: pre-wrap">{{ successMsg }}</div>
					<div style="color: red; white-space: pre-wrap">{{ msg }}</div>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import leftAside from "@/components/leftAside";
export default {
	name: "fileupload",
	components: {
		leftAside,
	},
	data() {
		return {
			activeValue: "reportDownload",
			successMsg: "",
			msg: "",
			isIndeterminate: true,
			key1: 1,
			reportForm: {
				dateValue: "",
				departmentValue: "",
				department: [],
				options: [],
				optionsValue: [],
			},
			loading2: "",
		};
	},
	mounted: function () {
		this.getDepartment();
	},
	methods: {
		getDepartment() {
			//获取职能部门
			this.$axios({
				url: "/api/department",
				method: "GET",
			})
				.then((res) => {
					if (res.data) {
						for (var i = 0; i < res.data.length; i++) {
							this.reportForm.department.push({
								label: res.data[i],
							});
						}
					}
				})
				.catch((_) => {
					console.log(_);
				});
		},
		getBrand() {
			this.reportForm.brand = [];
			//获取对应职能部门的品牌
			var datas = new Object();
			datas.department = this.reportForm.departmentValue;
			var postData = this.$qs.stringify(datas);
			this.$axios({
				url: "/api/brand",
				method: "POST",
				data: postData,
			})
				.then((res) => {
					if (res.data) {
						this.reportForm.options = res.data;
					}
				})
				.catch((_) => {
					console.log(_);
				});
		},
		startDownload() {
			if (
				this.reportForm.dateValue &&
				this.reportForm.departmentValue &&
				this.reportForm.optionsValue.length != 0
			) {
				var type = [];
				var brand = [];
				//获取lable的值
				for (var i = 0; i < this.reportForm.optionsValue.length; i++) {
					let obj = {};
					obj = this.reportForm.options.find((item) => {
						return (
							item.children[0].value ===
							this.reportForm.optionsValue[i][1]
						);
					});
					if (obj) {
						brand.push(obj.value);
						for (var j = 0; j < obj.children.length; j++) {
							for (
								var k = 0;
								k < this.reportForm.optionsValue.length;
								k++
							) {
								if (
									obj.children[j].value ==
									this.reportForm.optionsValue[k][1]
								) {
									type.push(obj.children[j].label);
								}
							}
						}
					}
				}
				var datas = new Object();
				datas.type = type;
				datas.date = this.reportForm.dateValue;
				datas.brand = brand;
				datas.department = this.reportForm.departmentValue;
				var postData = this.$qs.stringify(datas, {
					arrayFormat: "repeat",
				});
				this.$axios({
					url: "/api/download",
					method: "POST",
					data: postData,
					responseType: "json",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					onUploadProgress: (pe) => {
						this.loading2 = this.$loading({
							lock: true,
							text: "正在生成报表，请稍后...",
							spinner: "el-icon-loading",
							background: "rgba(0, 0, 0, 0.7)",
						});
					},
				})
					.then((res) => {
						if (res.data.code == 1) {
							this.loading2.close();
							this.$message.error(res.data.msg);
						} else if (res.data.code == 0) {
							this.loading2.close();
							window.location.href = "/api/" + res.data.filepath;
						}
					})
					.catch((_) => {
						this.loading2.close();
						console.log("下载失败");
					});
			} else {
				this.$message.error("请补全数据");
			}
		},
	},
};
</script>

<style>
body {
	margin: 0px;
}
.el-header {
	text-align: left;
	font-size: 1rem;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
		"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	background-color: #545c64;
	vertical-align: middle;
	color: #fff;
	line-height: 60px;
}
.el-aside {
	background-color: #545c64;
	height: calc(100vh - 60px);
}
.report {
	text-align: left;
	/* padding-top: 20px; */
	/* padding-left: 20px; */
	margin: 20px 0px 20px 30px;
	width: 800px;
	/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
}
:root {
	--input-width: 700px;
}
.report .options div.el-input {
	width: var(--input-width);
}
.report .date div.el-input {
	width: var(--input-width);
}

.report .department div.el-input {
	width: var(--input-width);
}
</style>