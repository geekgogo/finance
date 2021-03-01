<template>
	<el-container>
		<el-header>
			<img style="height: 50px" src="../assets/keying_logo.png" />
		</el-header>
		<el-container>
			<el-aside width="200px">
				<leftAside :activeValue="activeValue"></leftAside>
			</el-aside>
			<el-main>
				<div>
					<div class="tips">
						<el-alert title="Tips: 此处仅支持上传预算表；支持压缩包和文件" type="success" effect="dark" :closable="false"></el-alert>
					</div>
					<el-upload ref="upload" drag action :auto-upload="false" multiple>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">
							将文件拖到此处，或
							<em>点击选择</em>
						</div>
					</el-upload>
					<el-button type="primary" @click="submit">开始上传</el-button>

					<el-dialog
						title="上传进度"
						:visible="dialog"
						append-to-body
						:close-on-click-modal="false"
						:close-on-press-escape="false"
						:show-close="false"
					>
						<el-progress :percentage="progress"></el-progress>
						<p style="text-align: center; margin: 10px 0">已上传大小：{{ loaded }}，总大小： {{ total }}</p>
					</el-dialog>
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
			activeValue: "budget",
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
		handleClose(done) {
			this.reportForm.dateValue = "";
			this.reportForm.costCenterValue = "";
			done();
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
					url: "/api/uploadBudget",
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
							this.$message({
								dangerouslyUseHTMLString: true,
								duration: 0,
								showClose: true,
								message: res.data.msg,
							});
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
	height: 93.5vh;
}
.tips {
	margin: 20px;
}
</style>