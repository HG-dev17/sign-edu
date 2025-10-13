// 教材选择器功能
const gradeSelect = document.getElementById('grade-select');
const bookSelect = document.getElementById('book-select');
const lessonSelect = document.getElementById('lesson-select');
const videoPlaceholder = document.querySelector('.video-placeholder');

// 年级选择变化时
gradeSelect.addEventListener('change', function () {
    if (this.value) {
        bookSelect.disabled = false;
        bookSelect.innerHTML = '<option value="">-- 请选择教材 --</option>';
        bookSelect.innerHTML += '<option value="chinese">语文</option>';
        bookSelect.innerHTML += '<option value="math">数学</option>';
        lessonSelect.disabled = true;
        lessonSelect.innerHTML = '<option value="">-- 请先选择教材 --</option>';
        videoPlaceholder.innerHTML = '<i class="fas fa-play-circle"></i><p>请选择教材和课文查看手语视频</p>';
    } else {
        bookSelect.disabled = true;
        bookSelect.innerHTML = '<option value="">-- 请先选择年级 --</option>';
        lessonSelect.disabled = true;
        lessonSelect.innerHTML = '<option value="">-- 请先选择教材 --</option>';
        videoPlaceholder.innerHTML = '<i class="fas fa-play-circle"></i><p>请选择年级、教材和课文查看手语视频</p>';
    }
});

// 教材选择变化时
bookSelect.addEventListener('change', function () {
    if (this.value) {
        lessonSelect.disabled = false;
        lessonSelect.innerHTML = '<option value="">-- 请选择课文 --</option>';

        // 根据年级和教材生成课文列表
        const grade = gradeSelect.value;
        const book = this.value;

        // 示例课文数据
        let lessons = [];
        if (grade === '1' && book === 'chinese') {
            lessons = ['《上学歌》', '《小小的船》', '《江南》', '《四季》'];
        } else if (grade === '1' && book === 'math') {
            lessons = ['认识数字', '加法基础', '减法基础', '认识图形'];
        } else if (grade === '2' && book === 'chinese') {
            lessons = ['《小蝌蚪找妈妈》', '《我是什么》', '《植物妈妈有办法》', '《田家四季歌》'];
        } else {
            lessons = ['课文一', '课文二', '课文三', '课文四'];
        }

        lessons.forEach(lesson => {
            const option = document.createElement('option');
            option.value = lesson;
            option.textContent = lesson;
            lessonSelect.appendChild(option);
        });

        videoPlaceholder.innerHTML = '<i class="fas fa-play-circle"></i><p>请选择课文查看手语视频</p>';
    } else {
        lessonSelect.disabled = true;
        lessonSelect.innerHTML = '<option value="">-- 请先选择教材 --</option>';
        videoPlaceholder.innerHTML = '<i class="fas fa-play-circle"></i><p>请选择教材和课文查看手语视频</p>';
    }
});

// 课文选择变化时
lessonSelect.addEventListener('change', function () {
    if (this.value) {
        videoPlaceholder.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-play-circle" style="font-size: 4rem; color: #4a6fa5;"></i>
                <h3>${gradeSelect.options[gradeSelect.selectedIndex].text} · ${bookSelect.options[bookSelect.selectedIndex].text} · ${this.value}</h3>
                <p>正在加载手语教学视频...</p>
                <button class="btn" style="margin-top: 20px;" onclick="playVideo()">播放视频</button>
            </div>
        `;
    } else {
        videoPlaceholder.innerHTML = '<i class="fas fa-play-circle"></i><p>请选择课文查看手语视频</p>';
    }
});

// 播放视频函数
function playVideo() {
    const grade = gradeSelect.options[gradeSelect.selectedIndex].text;
    const book = bookSelect.options[bookSelect.selectedIndex].text;
    const lesson = lessonSelect.value;

    videoPlaceholder.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px;">
            <h3>${grade} · ${book} · ${lesson}</h3>
            <div style="background: #000; width: 80%; max-width: 800px; height: 0; padding-bottom: 45%; position: relative; margin: 20px 0;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #333; display: flex; justify-content: center; align-items: center; color: white;">
                    <i class="fas fa-play-circle" style="font-size: 4rem;"></i>
                </div>
            </div>
            <p>手语教学视频播放中...</p>
        </div>
    `;
}

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