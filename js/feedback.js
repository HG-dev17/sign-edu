document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');
    const formControls = document.querySelectorAll('.form-control');

    // 表单提交处理
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 简单的表单验证
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const feedbackType = document.getElementById('feedbackType').value;
        const suggestion = document.getElementById('suggestion').value;
        
        if (!name || !email || !feedbackType || !suggestion) {
            alert('请填写所有必填字段！');
            return;
        }
        
        // 在实际应用中，这里应该发送数据到服务器
        // 这里只是模拟提交成功
        
        // 显示成功消息
        successMessage.style.display = 'block';
        
        // 重置表单
        this.reset();
        
        // 3秒后隐藏成功消息
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
    
    // 添加输入框焦点效果
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});