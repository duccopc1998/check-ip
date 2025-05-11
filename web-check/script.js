// Hàm lấy IP khách truy cập  
function getIP() {  
  return fetch('https://api.ipify.org?format=json')  
      .then(response => response.json())  
      .then(data => data.ip);  
}  

// Hàm lấy vị trí dựa trên IP dùng API ipinfo.io (đăng ký lấy token miễn phí)  
function getLocation(ip) {  
  const token = '587cb561722664'; // Thay YOUR_TOKEN bằng token của bạn  
  return fetch(`https://ipinfo.io/${ip}/json?token=${token}`)  
      .then(response => response.json());  
}  

// Lấy thông tin thiết bị trình duyệt  
function getDeviceInfo() {  
  return {  
      userAgent: navigator.userAgent,  
      platform: navigator.platform,  
      language: navigator.language,  
  };  
}  

// Hiển thị thông tin ra trang  
function displayInfo(info) {  
  const div = document.getElementById('info');  
  div.innerHTML = `  
      <p><strong>IP:</strong> ${info.ip}</p>  
      <p><strong>Vị trí:</strong> ${info.city}, ${info.region}, ${info.country}</p>  
      <p><strong>Vật dụng trình duyệt:</strong></p>  
      <ul>  
          <li>User Agent: ${info.device.userAgent}</li>  
          <li>Hệ điều hành: ${info.device.platform}</li>  
          <li>Ngôn ngữ: ${info.device.language}</li>  
      </ul>  
  `;  
}  

// Chạy khi trang tải  
getIP().then(ip => {  
  getLocation(ip).then(location => {  
      const deviceInfo = getDeviceInfo();  
      const info = {  
          ip: ip,  
          city: location.city,  
          region: location.region,  
          country: location.country,  
          device: deviceInfo  
      };  
      displayInfo(info);  
      // Tại đây, bạn có thể gửi dữ liệu này về server để lưu trữ  
  });  
});