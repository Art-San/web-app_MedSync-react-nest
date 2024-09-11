// https://medsync.botfather.dev/api/diagnostics/

const allDiagnostic = [
	{
		diagnostic_id: 1,
		type_name: 'Magnetic Resonance Imaging',
		description:
			'A procedure using magnetic fields and radio waves to create detailed images of the organs and tissues within the body.',
		price: 233.63,
		photo_url: '/images/get-tested/mri.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 2,
		type_name: 'Computed Tomography',
		description:
			'An imaging procedure using X-rays and computer technology to produce cross-sectional images of the body.',
		price: 279.71,
		photo_url: '/images/get-tested/ct.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 3,
		type_name: 'X-Ray',
		description:
			'A test using small amounts of radiation to produce images of the structures inside the body, especially bones.',
		price: 423.16,
		photo_url: '/images/get-tested/x-ray.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 4,
		type_name: 'Ultrasound',
		description:
			'An imaging technique using high-frequency sound waves to create images of structures within the body.',
		price: 129.35,
		photo_url: '/images/get-tested/ultrasound.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 5,
		type_name: 'Positron Emission Tomography',
		description:
			'A procedure that helps show how tissues and organs are functioning, using a radioactive drug to show activity.',
		price: 335.71,
		photo_url: '/images/get-tested/pet.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 6,
		type_name: 'Blood Tests',
		description:
			'Tests performed on a blood sample to check the function of certain organs and to assess health.',
		price: 471.42,
		photo_url: '/images/get-tested/blood-test.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 7,
		type_name: 'Urine Tests',
		description:
			'Tests performed on a urine sample to check for various disorders, including those related to the kidneys and urinary tract.',
		price: 187.07,
		photo_url: '/images/get-tested/urine.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 8,
		type_name: 'Biopsy',
		description:
			'A procedure where a piece of tissue or a sample of cells is removed from the body to be examined under a microscope.',
		price: 153.88,
		photo_url: '/images/get-tested/biopsy.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 9,
		type_name: 'Electrocardiogram',
		description:
			'A test that measures the electrical activity of the heartbeat to identify abnormalities.',
		price: 171.19,
		photo_url: '/images/get-tested/ecg.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 10,
		type_name: 'Bone Density Test',
		description:
			'A test that measures bone mineral content to check for bone loss and osteoporosis.',
		price: 475.11,
		photo_url: '/images/get-tested/bone-density.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 11,
		type_name: 'Endoscopy',
		description:
			'A procedure to examine the digestive tract using a flexible tube with a light and camera attached to it.',
		price: 87.48,
		photo_url: '/images/get-tested/endoscopy.png',
		clinics_count: 3,
	},
	{
		diagnostic_id: 12,
		type_name: 'Colonoscopy',
		description:
			'A procedure to examine the inside of the colon and rectum, using a long, flexible tube with a camera on the end.',
		price: 111.67,
		photo_url: '/images/get-tested/colonoscopy.png',
		clinics_count: 3,
	},
]

// https://medsync.botfather.dev/api/working_hours/1
const all1 = [
	{
		weekday_index: 0,
		start_time: 11,
		created_at: '2023-10-10T18:12:26.245697',
		working_hour_id: 1,
		end_time: 20,
		location_id: 1,
	},
	{
		weekday_index: 1,
		start_time: 9,
		created_at: '2023-10-10T18:12:26.245697',
		working_hour_id: 2,
		end_time: 18,
		location_id: 1,
	},
	{
		weekday_index: 2,
		start_time: 10,
		created_at: '2023-10-10T18:12:26.245697',
		working_hour_id: 3,
		end_time: 19,
		location_id: 1,
	},
	{
		weekday_index: 3,
		start_time: 9,
		created_at: '2023-10-10T18:12:26.245697',
		working_hour_id: 4,
		end_time: 18,
		location_id: 1,
	},
	{
		weekday_index: 4,
		start_time: 9,
		created_at: '2023-10-10T18:12:26.245697',
		working_hour_id: 5,
		end_time: 18,
		location_id: 1,
	},
	{
		weekday_index: 5,
		start_time: 9,
		created_at: '2023-10-10T18:12:26.245697',
		working_hour_id: 6,
		end_time: 18,
		location_id: 1,
	},
]

// https://medsync.botfather.dev/api/diagnostics/1/locations
const allLocation = [
	{
		location_id: 2,
		name: 'Serrano LLC',
		address: 'Unit 6408 Box 4458\nDPO AA',
	},
	{
		location_id: 3,
		name: 'Carroll-Mcclain',
		address: 'USNS Mcknight\nFPO AA 3894',
	},
	{
		location_id: 1,
		name: 'Key Ltd',
		address: '05459 John Station\nNew Br',
	},
]
