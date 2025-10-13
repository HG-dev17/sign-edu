        // 教材选择器功能
        const gradeSelect = document.getElementById('grade-select');
        const versionSelect = document.getElementById('version-select');
        const lessonSelect = document.getElementById('lesson-select');
        const videoPlaceholder = document.querySelector('.video-placeholder');
        const videoPlayer = document.getElementById('video-player');
        const videoTitle = document.getElementById('video-title');
        const playBtn = document.getElementById('play-btn');
        const downloadBtn = document.getElementById('download-btn');
        const shareBtn = document.getElementById('share-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const videoElement = document.getElementById('video-element');

        // 年级选择变化时
        gradeSelect.addEventListener('change', function () {
            if (this.value) {
                versionSelect.disabled = false;
                versionSelect.innerHTML = '<option value="">-- 请选择教材版本 --</option>';
                versionSelect.innerHTML += '<option value="renjiao">人教版</option>';
                versionSelect.innerHTML += '<option value="beishida">北师大版</option>';
                versionSelect.innerHTML += '<option value="sujiao">苏教版</option>';

                lessonSelect.disabled = true;
                lessonSelect.innerHTML = '<option value="">-- 请先选择教材版本 --</option>';
                videoPlaceholder.style.display = 'flex';
                videoPlayer.style.display = 'none';
            } else {
                versionSelect.disabled = true;
                versionSelect.innerHTML = '<option value="">-- 请先选择年级 --</option>';
                lessonSelect.disabled = true;
                lessonSelect.innerHTML = '<option value="">-- 请先选择教材版本 --</option>';
                videoPlaceholder.style.display = 'flex';
                videoPlayer.style.display = 'none';
            }
        });

        // 教材版本选择变化时
        versionSelect.addEventListener('change', function () {
            if (this.value) {
                lessonSelect.disabled = false;
                lessonSelect.innerHTML = '<option value="">-- 请选择课文 --</option>';

                const grade = gradeSelect.value;
                const version = this.value;

                let lessons = [];
                if (grade === '1' && version === 'renjiao') {
                    lessons = ['《上学歌》', '《小小的船》', '《江南》', '《四季》', '《画》', '《大小多少》'];
                } else if (grade === '1' && version === 'beishida') {
                    lessons = ['《上学了》', '《数字歌》', '《山村》', '《我的家》', '《小小的船》', '《太阳》'];
                } else if (grade === '2' && version === 'renjiao') {
                    lessons = ['《小蝌蚪找妈妈》', '《我是什么》', '《植物妈妈有办法》', '《场景歌》', '《树之歌》', '《拍手歌》'];
                } else if (grade === '2' && version === 'beishida') {
                    lessons = ['《秋天》', '《植物妈妈有办法》', '《古诗二首》', '《妈妈睡了》', '《寒号鸟》', '《坐井观天》'];
                } else if (grade === '3' && version === 'renjiao') {
                    lessons = ['《大青树下的小学》', '《花的学校》', '《不懂就要问》', '《古诗三首》', '《铺满金色巴掌的水泥道》', '《秋天的雨》'];
                } else {
                    lessons = ['课文一', '课文二', '课文三', '课文四', '课文五', '课文六'];
                }

                lessons.forEach(lesson => {
                    const option = document.createElement('option');
                    option.value = lesson;
                    option.textContent = lesson;
                    lessonSelect.appendChild(option);
                });

                videoPlaceholder.style.display = 'flex';
                videoPlayer.style.display = 'none';
            } else {
                lessonSelect.disabled = true;
                lessonSelect.innerHTML = '<option value="">-- 请先选择教材版本 --</option>';
                videoPlaceholder.style.display = 'flex';
                videoPlayer.style.display = 'none';
            }
        });

        // 课文选择变化时
        lessonSelect.addEventListener('change', function () {
            if (this.value) {
                const grade = gradeSelect.options[gradeSelect.selectedIndex].text;
                const version = versionSelect.options[versionSelect.selectedIndex].text;
                const lesson = this.value;

                videoTitle.textContent = `${grade} · ${version} · ${lesson}`;
                videoPlaceholder.style.display = 'none';
                videoPlayer.style.display = 'flex';

                // 设置视频源并确保加载
                const videoPath = `videos/${grade}/${version}/${lesson}.mp4`;
                videoElement.src = videoPath;
                videoElement.load(); // 强制重新加载视频

                // 添加加载完成事件监听
                videoElement.onloadeddata = function () {
                    videoElement.play().catch(e => {
                        console.log('自动播放失败:', e);
                    });
                };

                // 添加错误处理
                videoElement.onerror = function () {
                    console.error('视频加载失败');
                    videoPlaceholder.style.display = 'flex';
                    videoPlayer.style.display = 'none';
                };
            } else {
                videoPlaceholder.style.display = 'flex';
                videoPlayer.style.display = 'none';
                videoElement.pause();
                videoElement.src = '';
            }
        });

        // 播放/暂停功能
        playBtn.addEventListener('click', function () {
            if (videoElement.paused) {
                videoElement.play();
                this.innerHTML = '<i class="fas fa-pause"></i> 暂停播放';
            } else {
                videoElement.pause();
                this.innerHTML = '<i class="fas fa-play"></i> 播放视频';
            }
        });

        // 下载功能
        downloadBtn.addEventListener('click', function () {
            const videoPath = videoElement.src;
            const link = document.createElement('a');
            link.href = videoPath;
            link.download = videoTitle.textContent + '.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // 分享功能
        shareBtn.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: videoTitle.textContent,
                    url: window.location.href
                }).catch(err => console.log('分享失败', err));
            } else {
                // 复制链接到剪贴板
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('链接已复制到剪贴板');
                });
            }
        });

        // 全屏功能
        fullscreenBtn.addEventListener('click', function () {
            if (!document.fullscreenElement) {
                videoElement.requestFullscreen().catch(err => {
                    alert(`无法进入全屏模式: ${err.message}`);
                });
                this.innerHTML = '<i class="fas fa-compress"></i> 退出全屏';
            } else {
                document.exitFullscreen();
                this.innerHTML = '<i class="fas fa-expand"></i> 全屏';
            }
        });

        // 监听全屏状态变化
        document.addEventListener('fullscreenchange', function () {
            if (!document.fullscreenElement) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> 全屏';
            }
        });

        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });