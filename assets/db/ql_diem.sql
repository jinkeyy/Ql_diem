-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2021 lúc 04:39 PM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ql_diem`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_danhsachsinhvienlop`
--

CREATE TABLE `t_danhsachsinhvienlop` (
  `idSVLop` int(11) NOT NULL,
  `maLop` int(11) NOT NULL,
  `maSinhVien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `t_danhsachsinhvienlop`
--

INSERT INTO `t_danhsachsinhvienlop` (`idSVLop`, `maLop`, `maSinhVien`) VALUES
(1, 2, 1801),
(2, 2, 1802),
(4, 1, 1802),
(6, 1, 1812),
(20, 4, 1800),
(25, 6, 1800),
(26, 7, 1800),
(27, 113, 1802);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_diem`
--

CREATE TABLE `t_diem` (
  `id` int(11) NOT NULL,
  `maSVLop` int(11) NOT NULL,
  `diemCC` float DEFAULT NULL,
  `diemGK` float DEFAULT NULL,
  `diemCK` float DEFAULT NULL,
  `diemTB` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `t_diem`
--

INSERT INTO `t_diem` (`id`, `maSVLop`, `diemCC`, `diemGK`, `diemCK`, `diemTB`) VALUES
(4, 4, 5.5, 1, 5, NULL),
(5, 6, 1, 2, 3, NULL),
(7, 20, 10, 10, 8, NULL),
(8, 25, 9, 9, 9, NULL),
(9, 26, 8, 8, 9, NULL),
(10, 27, 5, 5, 1.5, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_hocky`
--

CREATE TABLE `t_hocky` (
  `idHocKy` int(11) NOT NULL,
  `tenHocKy` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `t_hocky`
--

INSERT INTO `t_hocky` (`idHocKy`, `tenHocKy`) VALUES
(1, 'Học Kỳ II 2020-2021'),
(2, 'Học Kỳ I 2020-2021'),
(3, 'Học Kỳ II 2019-2020'),
(4, 'Học Kỳ I 2019-2020'),
(5, 'Học Kỳ II 2018-2019'),
(6, 'Học Kỳ I 2018-2019'),
(7, 'Học Kỳ II 2017-2018'),
(8, 'Học Kỳ I 2017-2018');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_lop`
--

CREATE TABLE `t_lop` (
  `idLop` int(11) NOT NULL,
  `maMonHoc` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenGiangVien` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maHocKy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `t_lop`
--

INSERT INTO `t_lop` (`idLop`, `maMonHoc`, `tenGiangVien`, `maHocKy`) VALUES
(1, 'MAT2405', '', 8),
(2, 'MAT2405', 'Nguyễn Văn X', 8),
(4, 'MAT2406', 'Nguyễn Văn T', 1),
(6, 'MAT2404', '', 1),
(7, 'MAT2407', '', 2),
(113, 'MAT2406', '', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_monhoc`
--

CREATE TABLE `t_monhoc` (
  `maMonHoc` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenMonHoc` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `soTinChi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `t_monhoc`
--

INSERT INTO `t_monhoc` (`maMonHoc`, `tenMonHoc`, `soTinChi`) VALUES
('MAT2404', 'Giải tích số', 2),
('MAT2405', 'Xác suất', 3),
('MAT2406', 'Thống Kê', 4),
('MAT2407', 'Xác suất Thống Kê', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_sinhvien`
--

CREATE TABLE `t_sinhvien` (
  `idSinhVien` int(11) NOT NULL,
  `tenSinhVien` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `khoa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ngaySinh` date NOT NULL,
  `diaChi` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matKhau` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `t_sinhvien`
--

INSERT INTO `t_sinhvien` (`idSinhVien`, `tenSinhVien`, `khoa`, `ngaySinh`, `diaChi`, `matKhau`) VALUES
(1800, 'Đoàn Thị Sáng', 'k63', '2021-06-19', 'Hà Nội', '1'),
(1801, 'Nguyễn Văn A', 'K63', '2000-01-06', 'Hà Nội', '1'),
(1802, 'Lê Thị H', 'k63', '0000-00-00', 'Lào Cai', '1'),
(1812, 'Nguyễn Văn B', 'k63', '0000-00-00', 'HCM', '1');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `t_danhsachsinhvienlop`
--
ALTER TABLE `t_danhsachsinhvienlop`
  ADD PRIMARY KEY (`idSVLop`),
  ADD KEY `kn_maSinhVien_dssvl` (`maSinhVien`),
  ADD KEY `kn_maLop_dssvl` (`maLop`);

--
-- Chỉ mục cho bảng `t_diem`
--
ALTER TABLE `t_diem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `maSVLop_2` (`maSVLop`),
  ADD KEY `maSVLop` (`maSVLop`);

--
-- Chỉ mục cho bảng `t_hocky`
--
ALTER TABLE `t_hocky`
  ADD PRIMARY KEY (`idHocKy`);

--
-- Chỉ mục cho bảng `t_lop`
--
ALTER TABLE `t_lop`
  ADD PRIMARY KEY (`idLop`),
  ADD KEY `kn_maHocKy_Lop` (`maHocKy`),
  ADD KEY `kn_maMonHoc_lop` (`maMonHoc`);

--
-- Chỉ mục cho bảng `t_monhoc`
--
ALTER TABLE `t_monhoc`
  ADD PRIMARY KEY (`maMonHoc`);

--
-- Chỉ mục cho bảng `t_sinhvien`
--
ALTER TABLE `t_sinhvien`
  ADD PRIMARY KEY (`idSinhVien`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `t_danhsachsinhvienlop`
--
ALTER TABLE `t_danhsachsinhvienlop`
  MODIFY `idSVLop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `t_diem`
--
ALTER TABLE `t_diem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `t_hocky`
--
ALTER TABLE `t_hocky`
  MODIFY `idHocKy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `t_danhsachsinhvienlop`
--
ALTER TABLE `t_danhsachsinhvienlop`
  ADD CONSTRAINT `kn_maLop_dssvl` FOREIGN KEY (`maLop`) REFERENCES `t_lop` (`idLop`),
  ADD CONSTRAINT `kn_maSinhVien_dssvl` FOREIGN KEY (`maSinhVien`) REFERENCES `t_sinhvien` (`idSinhVien`);

--
-- Các ràng buộc cho bảng `t_diem`
--
ALTER TABLE `t_diem`
  ADD CONSTRAINT `kn_maSVLop_diem` FOREIGN KEY (`maSVLop`) REFERENCES `t_danhsachsinhvienlop` (`idSVLop`);

--
-- Các ràng buộc cho bảng `t_lop`
--
ALTER TABLE `t_lop`
  ADD CONSTRAINT `kn_maHocKy_Lop` FOREIGN KEY (`maHocKy`) REFERENCES `t_hocky` (`idHocKy`),
  ADD CONSTRAINT `kn_maMonHoc_lop` FOREIGN KEY (`maMonHoc`) REFERENCES `t_monhoc` (`maMonHoc`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
