<template>
	<div>
		<!-- <el-upload
			class="upload-demo"
			ref="upload"
			action=""
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:file-list="fileList"
			:auto-upload="false"
			:multiple="true"
			:limit="limit"
			:on-error="uploadError"
			:on-success="uploadSuccess"
			:on-exceed="exceed"
			:http-request="uploadFile"
		>
			<el-button slot="trigger" size="small" type="primary"
				>选取文件</el-button
			>
			<el-button
				style="margin-left: 10px"
				size="small"
				type="success"
				@click="submitupload"
				>上传到服务器</el-button
			>
			<el-button size="small" type="primary" @click="dialogVisible = true"
				>下载报表</el-button
			>
			<div slot="tip" class="el-upload__tip">可一次性上传多个文件</div>
			<div slot="tip" class="el-upload__tip" style="color: green">
				{{ msg }}
			</div>
			<div slot="tip" class="el-upload__tip" style="color: red">
				{{ errorMsg }}
			</div>
		</el-upload>
		<el-dialog
			title="请选择报表范围"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-date-picker
				v-model="dateValue"
				type="month"
				value-format="yyyy-MM"
				placeholder="选择月"
			>
			</el-date-picker>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="startDownload"
					>确 定</el-button
				>
			</span>
		</el-dialog>
		<div class="footer">
			<div class="title">
				<span>产品资料</span>
				<span>（提示：文件请控制大小在10MB以内）</span>
				<el-upload
					multiple
					:action="uploadUrl"
					:show-file-list="false"
					:file-list="fileArr"
					:before-upload="beforeUploadFile"
					:on-progress="uploadFileProcess"
					:on-success="handleFileSuccess"
				>
					<el-button size="small" type="primary">浏览</el-button>
				</el-upload>
			</div>
			<div class="file">
				<div v-for="(item, index) in fileArr" :key="index">
					{{ fileArr }}
					<span><i class="bg"></i>{{ item.name }}</span>
					<div v-if="item.progressFlag">
						<el-progress
							:percentage="item.progressPercent"
						></el-progress>
					</div>
					<span v-else-if="item.successFlag">上传成功!</span>
					<span v-else>上传失败!</span>
					<span>{{ item.size | fileSize }}</span>
					<div v-if="item.progressFlag">
						<span>[删除]</span>
						<span>[下载]</span>
					</div>
					<div v-else>
						<span @click="removeFile(item, index)">[删除]</span>
						<span @click="downLoadFile(item, index)">[下载]</span>
					</div>
				</div>
			</div>
		</div> -->

		<el-upload ref="upload" drag action="" :auto-upload="false" multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
				将文件拖到此处，或<em>点击选择</em>
			</div>
		</el-upload>
		<el-button type="primary" @click="submit">开始上传</el-button>
		<el-button type="primary" @click="dialogVisible = true"
			>下载报表</el-button
		>

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
			<el-date-picker
				v-model="dateValue"
				type="month"
				value-format="yyyy-MM"
				placeholder="选择月"
			>
			</el-date-picker>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="startDownload"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "fileupload",
	data() {
		return {
			fileList: [],
			limit: 10,
			msg: "",
			errorMsg: "",
			dialogVisible: false,
			dateValue: "",
			uploadUrl: "",
			fileArr: [],
			dialog: false,
			loaded: 0,
			total: 0,
			progress: 0,
		};
	},
	methods: {
		// submitupload() {
		// 	this.$refs.upload.submit();
		// },
		// handleRemove(file, fileList) {
		// 	console.log(file, fileList);
		// },
		// handlePreview(file) {
		// 	console.log(file);
		// },
		// uploadError(file) {
		// 	console.log(file);
		// 	this.errorMsg = "上传失败";
		// },
		// uploadSuccess(file) {
		// 	console.log(file);
		// 	this.msg = "上传成功";
		// },
		// exceed() {
		// 	this.errorMsg = "超出文件上传个数";
		// },
		handleClose() {
			console.log("yes");
		},
		startDownload() {
			this.dialogVisible = false;
			console.log(this.dateValue);
			//获取文件流下载
		},
		// uploadFile(file) {
		// 	console.log(file);
		// 	console.log("开始上传");
		// },
		// //上传前的函数(用于验证上传文件格式及大小)
		// beforeUploadFile(file) {
		// 	// const isLt10M = file.size / 1024 / 1024 < 10;
		// 	// if (!isLt10M) {
		// 	// 	return false;
		// 	// }
		// 	console.log(file);
		// 	// return true;
		// },
		// //文件上传过程中的函数(在这里获取进度条的进度)
		// uploadFileProcess(event, file, fileList) {
		// 	this.fileArr = fileList;
		// 	this.fileArr.forEach((item) => {
		// 		console.log(item);
		// 		if (item.percentage == 100) {
		// 			console.log(item);
		// 		} else {
		// 			item.progressFlag = true;
		// 			item.progressPercent = Math.abs(item.percentage.toFixed(0));
		// 		}
		// 	});
		// },
		// //文件上传成功的函数(用于文件上传成功之后的逻辑)
		// handleFileSuccess(res, file, fileList) {
		// 	this.fileArr = fileList;
		// 	this.fileArr.forEach((item, index) => {
		// 		console.log(item, index);
		// 		item.progressFlag = false;
		// 		if (item.status == "success") {
		// 			item.successFlag = true;
		// 		} else {
		// 			item.successFlag = false;
		// 		}
		// 	});
		// },
		// //删除文件(基于文件列表的数据进行操作)
		// removeFile(item, index) {
		// 	console.log(item);
		// 	this.fileArr.splice(index, 1);
		// },
		// //下载文件(基于文件列表的数据进行操作)
		// downLoadFile(item, index) {
		// 	console.log(item, index);
		// },

		submit() {
			const files = this.$refs.upload.uploadFiles;
			console.log(files);
			//检测文件名
			//checkFileName(files)
			if (files && files.length) {
				const fd = new FormData();
				files.forEach((item) => {
					console.log("item:", item);
					fd.append("files", item.raw, item.name);
				});
				this.dialog = true;
				this.progress = this.loaded = this.total = 0;
				this.$axios({
					url: "/api/upload",
					method: "post",
					onUploadProgress: (pe) => {
						this.progress = Number.parseInt(
							(pe.loaded / pe.total) * 100
						);
						this.loaded = pe.loaded;
						this.total = pe.total;
					},
					data: fd,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
					.then((res) => {
						console.log(res);
						this.$message.success("上传成功");
						this.$refs.upload.clearFiles();
						this.dialog = false;
					})
					.catch((_) => {
						this.$message.error("上传失败");
						this.$refs.upload.clearFiles();
						this.dialog = false;
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