// https://medsync.botfather.dev/api/doctors/1

const one = {
  "doctor_id": 1,
  "location_id": 2,
  "full_name": "Samuel Rhodes",
  "specialty_name": "Cardiologist",
  "specialty_id": 1,
  "price": 139.06,
  "photo_url": "/images/doctors-listing/profiles/1.png",
  "location_address": "Unit 6408 Box 4458\nDPO AA",
  "experience": "With a robust experience in diagnosing and treating a variety of neurological conditions such as epilepsy, Alzheimer's disease, and migraine, I ensure a thorough examination and tailored treatment plans for every patient.",
  "certificates": "Board Certified in Neurology, Fellowship in Epilepsy.",
  "location_name": "Serrano LLC",
  "avg_rating": 4.5,
  "reviews": 200,
  "services": "Neurological consultation\nEpilepsy management\nAlzheimer's treatment\nMigraine treatment."
}


// https://medsync.botfather.dev/api/doctors/

const all = [
  {
      "doctor_id": 1,
      "location_id": 2,
      "full_name": "Samuel Rhodes",
      "specialty_name": "Cardiologist",
      "specialty_id": 1,
      "price": 139.06,
      "photo_url": "/images/doctors-listing/profiles/1.png",
      "location_name": "Serrano LLC",
      "location_address": "Unit 6408 Box 4458\nDPO AA",
      "avg_rating": 4.5,
      "reviews": 200
  },
  {
      "doctor_id": 2,
      "location_id": 3,
      "full_name": "Christopher Cross",
      "specialty_name": "Otolaryngologist",
      "specialty_id": 9,
      "price": 121.73,
      "photo_url": "/images/doctors-listing/profiles/2.png",
      "location_name": "Carroll-Mcclain",
      "location_address": "USNS Mcknight\nFPO AA 3894",
      "avg_rating": 4.394594594594595,
      "reviews": 185
  },
  {
      "doctor_id": 3,
      "location_id": 3,
      "full_name": "Ronald Kelly",
      "specialty_name": "Neurologist",
      "specialty_id": 7,
      "price": 51.0,
      "photo_url": "/images/doctors-listing/profiles/3.png",
      "location_name": "Carroll-Mcclain",
      "location_address": "USNS Mcknight\nFPO AA 3894",
      "avg_rating": 4.457142857142857,
      "reviews": 140
  },
  {
      "doctor_id": 4,
      "location_id": 2,
      "full_name": "Jeffrey Estrada",
      "specialty_name": "Otolaryngologist",
      "specialty_id": 9,
      "price": 133.1,
      "photo_url": "/images/doctors-listing/profiles/5.png",
      "location_name": "Serrano LLC",
      "location_address": "Unit 6408 Box 4458\nDPO AA",
      "avg_rating": 4.412037037037037,
      "reviews": 216
  },
  {
      "doctor_id": 5,
      "location_id": 2,
      "full_name": "Joseph Woodward",
      "specialty_name": "Ophthalmologist",
      "specialty_id": 8,
      "price": 101.83,
      "photo_url": "/images/doctors-listing/profiles/6.png",
      "location_name": "Serrano LLC",
      "location_address": "Unit 6408 Box 4458\nDPO AA",
      "avg_rating": 4.338461538461538,
      "reviews": 65
  },
  {
      "doctor_id": 6,
      "location_id": 2,
      "full_name": "Shawn Bean",
      "specialty_name": "Dermatologist",
      "specialty_id": 2,
      "price": 182.64,
      "photo_url": "/images/doctors-listing/profiles/10.png",
      "location_name": "Serrano LLC",
      "location_address": "Unit 6408 Box 4458\nDPO AA",
      "avg_rating": 4.329032258064516,
      "reviews": 155
  },
  {
      "doctor_id": 7,
      "location_id": 3,
      "full_name": "Janet Anderson",
      "specialty_name": "Dermatologist",
      "specialty_id": 2,
      "price": 164.2,
      "photo_url": "/images/doctors-listing/profiles/4.png",
      "location_name": "Carroll-Mcclain",
      "location_address": "USNS Mcknight\nFPO AA 3894",
      "avg_rating": 4.426008968609866,
      "reviews": 223
  },
  {
      "doctor_id": 8,
      "location_id": 3,
      "full_name": "Sally Mendoza",
      "specialty_name": "Neurologist",
      "specialty_id": 7,
      "price": 126.41,
      "photo_url": "/images/doctors-listing/profiles/7.png",
      "location_name": "Carroll-Mcclain",
      "location_address": "USNS Mcknight\nFPO AA 3894",
      "avg_rating": 4.462686567164179,
      "reviews": 67
  },
  {
      "doctor_id": 9,
      "location_id": 3,
      "full_name": "Kelly Harper",
      "specialty_name": "Cardiologist",
      "specialty_id": 1,
      "price": 149.92,
      "photo_url": "/images/doctors-listing/profiles/8.png",
      "location_name": "Carroll-Mcclain",
      "location_address": "USNS Mcknight\nFPO AA 3894",
      "avg_rating": 4.391891891891892,
      "reviews": 148
  },
  {
      "doctor_id": 10,
      "location_id": 2,
      "full_name": "Cindy Walker",
      "specialty_name": "Cardiologist",
      "specialty_id": 1,
      "price": 86.02,
      "photo_url": "/images/doctors-listing/profiles/9.png",
      "location_name": "Serrano LLC",
      "location_address": "Unit 6408 Box 4458\nDPO AA",
      "avg_rating": 4.348314606741573,
      "reviews": 89
  },
  {
      "doctor_id": 11,
      "location_id": 1,
      "full_name": "Emma Ortiz",
      "specialty_name": "Neurologist",
      "specialty_id": 7,
      "price": 69.79,
      "photo_url": "/images/doctors-listing/profiles/11.png",
      "location_name": "Key Ltd",
      "location_address": "05459 John Station\nNew Br",
      "avg_rating": 4.420560747663552,
      "reviews": 214
  },
  {
      "doctor_id": 12,
      "location_id": 3,
      "full_name": "Wendy Green",
      "specialty_name": "Dermatologist",
      "specialty_id": 2,
      "price": 170.72,
      "photo_url": "/images/doctors-listing/profiles/12.png",
      "location_name": "Carroll-Mcclain",
      "location_address": "USNS Mcknight\nFPO AA 3894",
      "avg_rating": 4.46875,
      "reviews": 96
  }
]
