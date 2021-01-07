<template>
	<div>
		<el-upload ref="upload" drag action="" :auto-upload="false" multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
				将文件拖到此处，或<em>点击选择</em>
			</div>
		</el-upload>
		<el-button type="primary" @click="submit">开始上传</el-button>
		<el-button type="primary" @click="downLoadReport">下载报表</el-button>

		<el-dialog
			title="上传进度"
			:visible="dialog"
			append-to-body
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:show-close="false"
		>
			<el-progress :percentage="progress"></el-progress>
			<p style="text-align: center; margin: 10px 0">
				已上传大小：{{ loaded }}，总大小： {{ total }}
			</p>
		</el-dialog>

		<el-dialog
			title="请选择报表范围"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-form ref="reportForm" :model="reportForm" label-width="80px">
				<el-form-item label="成本中心">
					<el-select
						v-model="reportForm.costCenterValue"
						filterable
						placeholder="请选择"
					>
						<el-option
							v-for="item in reportForm.costCenter"
							:key="item.index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="月份">
					<el-date-picker
						v-model="reportForm.dateValue"
						type="month"
						value-format="yyyy-MM"
						placeholder="选择月"
					>
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="startDownload"
					>确 定</el-button
				>
			</span>
		</el-dialog>
		<div style="margin-top: 20px; color: green; white-space: pre-wrap">
			{{ successMsg }}
		</div>
		<div style="color: red; white-space: pre-wrap">
			{{ msg }}
		</div>
	</div>
</template>

<script>
export default {
	name: "fileupload",
	data() {
		return {
			fileList: [],
			limit: 10,
			successMsg: "",
			msg: "",
			errorMsg: "",
			dialogVisible: false,
			uploadUrl: "",
			fileArr: [],
			dialog: false,
			loaded: 0,
			total: 0,
			progress: 0,
			reportForm: {
				dateValue: "",
				costCenterValue: "",
				costCenter: [],
			},
			loading: "",
			loading2: "",
		};
	},
	mounted: function () {
		// this.getCostCenter();
	},
	methods: {
		downLoadReport() {
			this.dialogVisible = true;
			//获取成本中心
			this.$axios({
				url: "/api/cost_center",
				method: "GET",
			})
				.then((res) => {
					this.reportForm.costCenter = res.data;
				})
				.catch((_) => {
					console.log(_);
				});
		},
		handleClose(done) {
			this.reportForm.dateValue = "";
			this.reportForm.costCenterValue = "";
			done();
		},
		startDownload() {
			this.dialogVisible = false;
			var datas = new Object();
			datas.costCenter = this.reportForm.costCenterValue;
			datas.date = this.reportForm.dateValue;
			this.$axios({
				url: "/api/download",
				method: "POST",
				data: this.$qs.stringify(datas),
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
					console.log(_);
					console.log("下载失败");
				});
		},
		submit() {
			this.msg = "";
			this.successMsg = "";
			const files = this.$refs.upload.uploadFiles;
			//检测文件名
			//checkFileName(files)
			if (files && files.length) {
				const fd = new FormData();
				files.forEach((item) => {
					fd.append("files", item.raw, item.name);
				});
				// this.dialog = true;
				// this.progress = this.loaded = this.total = 0;
				this.$axios({
					url: "/api/upload",
					method: "post",
					onUploadProgress: (pe) => {
						this.loading = this.$loading({
							lock: true,
							text: "正在上传，请稍后...",
							spinner: "el-icon-loading",
							background: "rgba(0, 0, 0, 0.7)",
						});
					},
					data: fd,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
					.then((res) => {
						this.loading.close();
						console.log(res);
						if (res.data.code == "0") {
							this.successMsg = res.data.success_msg;
							this.msg = res.data.error_msg;
						}
						this.$refs.upload.clearFiles();
						// this.dialog = false;
					})
					.catch((_) => {
						this.loading.close();
						this.$message.error(
							"上传失败：表的内容与解析不匹配或者后台出现错误"
						);
						this.$refs.upload.clearFiles();
						// this.dialog = false;
					});
			} else {
				this.$message.warning("至少选择一个文件");
			}
		},
	},
};
</script>

<style>
</style>