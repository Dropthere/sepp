import { TrainingProgram } from '../types';

export const trainingPrograms: TrainingProgram[] = [
  {
    name: "2-Day Split",
    description: "Perfect for beginners starting their bodybuilding journey",
    level: "beginner",
    daysPerWeek: 2,
    days: [
      {
        name: "Day 1 - Front Body",
        focus: "Chest, Quads, Biceps, Abs",
        exercises: [
          {
            name: "Smith Machine Incline Bench Press",
            sets: 4,
            reps: "8-12",
            videoUrl: "https://youtu.be/5hs2YPuJz4A",
            description: "Focus on controlled movement and full range of motion"
          },
          {
            name: "Cable Crossover Flyes",
            sets: 3,
            reps: "10-15",
            videoUrl: "https://youtu.be/As8Inbj-XYg",
            description: "Squeeze at the peak contraction"
          },
          {
            name: "Plate Loaded Leg Press",
            sets: 4,
            reps: "10-12",
            videoUrl: "https://youtu.be/kUUeWyOVccM",
            description: "Full depth for maximum quad activation"
          },
          {
            name: "Dumbbell Alternating Curls",
            sets: 3,
            reps: "12-15 each arm",
            videoUrl: "https://youtu.be/6iKvyZR3JB4",
            description: "Alternate arms for better focus"
          },
          {
            name: "Cable Rope Hammer Curls",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/Hq43LNfMZHM",
            description: "Target the brachialis muscle"
          },
          {
            name: "Leg Extension Machine",
            sets: 4,
            reps: "15-20",
            videoUrl: "https://youtu.be/jCvdDNDhLTU",
            description: "Isolation exercise for quad definition"
          },
          {
            name: "Cable Crunches",
            sets: 3,
            reps: "15-20",
            videoUrl: "https://youtu.be/Hq43LNfMZHM",
            description: "Focus on the contraction"
          },
          {
            name: "Hanging Leg Raises",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/N22lc_7KDsk",
            description: "Control the movement, avoid swinging"
          }
        ]
      },
      {
        name: "Day 4 - Back Body",
        focus: "Shoulders, Back, Hamstrings",
        exercises: [
          {
            name: "Smith Machine Shoulder Press",
            sets: 4,
            reps: "8-12",
            videoUrl: "https://youtu.be/c8XmepbezYU",
            description: "Build overall shoulder mass"
          },
          {
            name: "Cable Face Pulls",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/TwfFZ9H5FFc",
            description: "Essential for rear delt development"
          },
          {
            name: "Dumbbell Lateral Raises",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/m8c4xYSiS6U",
            description: "Build shoulder width"
          },
          {
            name: "Plate Loaded Row Machine",
            sets: 4,
            reps: "8-12",
            videoUrl: "https://youtu.be/lOulgkk4MSE",
            description: "Focus on squeezing shoulder blades"
          },
          {
            name: "Cable Lat Pulldowns",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/T2Ettbsebtw",
            description: "Build lat width"
          },
          {
            name: "Smith Machine Bent Over Rows",
            sets: 3,
            reps: "8-12",
            videoUrl: "https://youtu.be/4f7ceHvzXOs",
            description: "Target middle traps and rhomboids"
          },
          {
            name: "Plate Loaded Hamstring Curls",
            sets: 4,
            reps: "10-12",
            videoUrl: "https://youtu.be/4yySVu4zHHY",
            description: "Isolation for hamstring development"
          },
          {
            name: "Cable Pull-Throughs",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/wKpQ5QHv7js",
            description: "Hip hinge movement pattern"
          },
          {
            name: "Smith Machine Romanian Deadlifts",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/RENq9QgGbfY",
            description: "Focus on hamstring stretch"
          }
        ]
      }
    ]
  },
  {
    name: "3-Day Split",
    description: "Ideal for those who can train 3 days per week",
    level: "intermediate",
    daysPerWeek: 3,
    days: [
      {
        name: "Day 1 - Chest, Shoulders & Triceps",
        focus: "Push muscles",
        exercises: [
          {
            name: "Smith Machine Bench Press",
            sets: 4,
            reps: "8-10",
            videoUrl: "https://youtu.be/5hs2YPuJz4A",
            description: "Compound movement for chest mass"
          },
          {
            name: "Cable Flyes",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/As8Inbj-XYg",
            description: "Isolation for chest definition"
          },
          {
            name: "Dumbbell Shoulder Press",
            sets: 4,
            reps: "8-10",
            videoUrl: "https://youtu.be/_YK1Msb3mzM",
            description: "Build shoulder mass and strength"
          },
          {
            name: "Cable Lateral Raises",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/m8c4xYSiS6U",
            description: "Target medial deltoids"
          },
          {
            name: "Plate Loaded Shoulder Press",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/c8XmepbezYU",
            description: "Machine variation for safety"
          },
          {
            name: "Cable Rope Tricep Pushdowns",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/gFrFTBXnNvo",
            description: "Tricep isolation movement"
          },
          {
            name: "Dumbbell Overhead Tricep Extensions",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/Tw_B_R0ROwo",
            description: "Stretch the triceps fully"
          }
        ]
      },
      {
        name: "Day 3 - Legs, Hamstrings & Calves",
        focus: "Lower body",
        exercises: [
          {
            name: "Smith Machine Squats",
            sets: 4,
            reps: "8-10",
            videoUrl: "https://youtu.be/5W5GUoZnOlU",
            description: "Compound leg movement"
          },
          {
            name: "Plate Loaded Leg Press",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/lAAxNS1rKv4",
            description: "High volume quad work"
          },
          {
            name: "Dumbbell Walking Lunges",
            sets: 3,
            reps: "12 steps each leg",
            videoUrl: "https://youtu.be/M5KwAs9cccE",
            description: "Unilateral leg development"
          },
          {
            name: "Cable Pull-Throughs",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/wKpQ5QHv7js",
            description: "Hip hinge pattern"
          },
          {
            name: "Plate Loaded Seated Leg Curls",
            sets: 4,
            reps: "10-12",
            videoUrl: "https://youtu.be/4yySVu4zHHY",
            description: "Hamstring isolation"
          },
          {
            name: "Smith Machine Calf Raises",
            sets: 4,
            reps: "15-20",
            videoUrl: "https://youtu.be/knUitBQaCx0",
            description: "Standing calf development"
          },
          {
            name: "Seated Dumbbell Calf Raises",
            sets: 3,
            reps: "15-20",
            videoUrl: "https://youtu.be/rE5xWp-06g4",
            description: "Target soleus muscle"
          }
        ]
      },
      {
        name: "Day 5 - Back, Biceps & Core",
        focus: "Pull muscles",
        exercises: [
          {
            name: "Plate Loaded Row Machine",
            sets: 4,
            reps: "8-10",
            videoUrl: "https://youtu.be/lOulgkk4MSE",
            description: "Compound back movement"
          },
          {
            name: "Cable Lat Pulldowns",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/KnyC2wENYcU",
            description: "Lat width development"
          },
          {
            name: "Smith Machine Bent Over Rows",
            sets: 3,
            reps: "8-10",
            videoUrl: "https://youtu.be/4f7ceHvzXOs",
            description: "Middle trap focus"
          },
          {
            name: "Dumbbell Pullovers",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/FnbTqDF-z0Q",
            description: "Lat stretch and serratus"
          },
          {
            name: "Cable Bicep Curls",
            sets: 3,
            reps: "10-12",
            videoUrl: "https://youtu.be/60S78-1o4ak",
            description: "Constant tension on biceps"
          },
          {
            name: "Dumbbell Hammer Curls",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/y95_Sn6vqRQ",
            description: "Brachialis development"
          },
          {
            name: "Cable Crunches",
            sets: 3,
            reps: "15-20",
            videoUrl: "https://youtu.be/Hq43LNfMZHM",
            description: "Weighted ab work"
          },
          {
            name: "Hanging Leg Raises",
            sets: 3,
            reps: "12-15",
            videoUrl: "https://youtu.be/N22lc_7KDsk",
            description: "Lower ab focus"
          }
        ]
      }
    ]
  },
  {
    name: "Female Glute & Leg Specialization",
    description: "Complete 3-day program for developing glutes and legs - better for making your legs bigger",
    level: "intermediate",
    daysPerWeek: 3,
    days: [
      {
        name: "Day 1 - Quads, Biceps & Delts",
        focus: "Quadriceps, biceps and shoulder development",
        exercises: [
          {
            name: "Leg Extension",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/jOH4j7ICzR8",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Quad isolation"
          },
          {
            name: "Squats",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/5W5GUoZnOlU",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Compound leg movement"
          },
          {
            name: "Leg Press",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/lAAxNS1rKv4",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "High volume quad work"
          },
          {
            name: "Stretched Curls",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/2j5HhQNPEiE",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Full range bicep work"
          },
          {
            name: "Side Lateral Raises",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/m8c4xYSiS6U",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Medial delt isolation"
          }
        ]
      },
      {
        name: "Day 2 - Chest, Back & Triceps",
        focus: "Upper body development",
        exercises: [
          {
            name: "Incline Chest Press",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/Z_MmFvSKDJ0",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Upper chest focus"
          },
          {
            name: "Flyes",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/v41p47zWBRk",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Chest isolation"
          },
          {
            name: "Low to High Cable Fly",
            sets: 3,
            reps: "12",
            videoUrl: "https://youtu.be/XMp6OtJxAFQ",
            description: "Targets the upper chest. Start with cables set to the lowest pulley setting. Keep a slight bend in your elbows. Move hands upward and inward in an arcing motion. Squeeze the upper chest at the top of the movement. Great isolation movement for developing the upper chest line and inner chest definition."
          },
          {
            name: "Plate Loaded Pull Down",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/T2Ettbsebtw",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Lat width development"
          },
          {
            name: "Low Row",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/4f7ceHvzXOs",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Middle trap thickness"
          },
          {
            name: "Seated Row",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/lOulgkk4MSE",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Rhomboid focus"
          },
          {
            name: "Overhead Extension",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/Tw_B_R0ROwo",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Tricep mass builder"
          },
          {
            name: "Skull Crushers",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/wS-xNbuhFEAT",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Tricep isolation"
          }
        ]
      },
      {
        name: "Day 3 - Hamstrings & Delts",
        focus: "Posterior chain and shoulders",
        exercises: [
          {
            name: "Lying Leg Curl",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/BR-9QlnCjX8",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Hamstring isolation"
          },
          {
            name: "Seated Hamstring Curl",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/4yySVu4zHHY",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Different hamstring angle"
          },
          {
            name: "Cable Hamstring Pull Throughs",
            sets: 4,
            reps: "10",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/wKpQ5QHv7js",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Hip hinge pattern"
          },
          {
            name: "Upright Row",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/OZ7OauVXGI4",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Shoulder width"
          },
          {
            name: "Rear Delt Flyes",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/fKcScHz_4pc",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Posterior delt focus"
          }
        ]
      }
    ]
  },
  {
    name: "4-Day Back & Tricep Strongman",
    description: "Good for gaining muscle tissue with focused back and tricep work",
    level: "intermediate",
    daysPerWeek: 4,
    days: [
      {
        name: "Day 1 - Chest & Biceps",
        focus: "Chest development and bicep mass",
        exercises: [
          {
            name: "Incline Chest Press",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/Z_MmFvSKDJ0",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Upper chest focus"
          },
          {
            name: "Plate Loaded Chest Press",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/SEZSkfD6fVw",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Middle chest mass"
          },
          {
            name: "Flyes",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/v41p47zWBRk",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Chest isolation"
          },
          {
            name: "Upper Flyes",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/XMp6OtJxAFQ",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Upper chest definition"
          },
          {
            name: "Standing Curls",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/60S78-1o4ak",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Bicep mass builder"
          },
          {
            name: "Stretched Curls",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/2j5HhQNPEiE",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Full range bicep work"
          },
          {
            name: "Isolation Curls",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/jC--5mXaDLQ",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Bicep peak focus"
          }
        ]
      },
      {
        name: "Day 2 - Legs",
        focus: "Quadriceps and hamstrings",
        exercises: [
          {
            name: "Leg Extension",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/jOH4j7ICzR8",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Quad pre-exhaust"
          },
          {
            name: "Squats",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/5W5GUoZnOlU",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Compound leg mass"
          },
          {
            name: "Leg Press",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/lAAxNS1rKv4",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "High volume quad work"
          },
          {
            name: "Lying Leg Curl",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/BR-9QlnCjX8",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Hamstring isolation"
          }
        ]
      },
      {
        name: "Day 3 - Back & Tricep",
        focus: "Back width and tricep mass",
        exercises: [
          {
            name: "Plate Loaded Pull Down",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/T2Ettbsebtw",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Lat width development"
          },
          {
            name: "Low Row",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/4f7ceHvzXOs",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Middle trap thickness"
          },
          {
            name: "Seated Row",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/lOulgkk4MSE",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Rhomboid focus"
          },
          {
            name: "Lateral Pullover",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/FnbTqDF-z0Q",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Lat stretch"
          },
          {
            name: "Overhead Extension",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/Tw_B_R0ROwo",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Tricep mass builder"
          },
          {
            name: "Skull Crushers",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/wS-xNbuhFEAT",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Tricep isolation"
          },
          {
            name: "Tricep Extension",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/2JVjZjwIXCg",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Tricep definition"
          }
        ]
      },
      {
        name: "Day 4 - Shoulders",
        focus: "Complete shoulder development",
        exercises: [
          {
            name: "Shoulder Press",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/_YK1Msb3mzM",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Overall shoulder mass"
          },
          {
            name: "Upright Row",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/OZ7OauVXGI4",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Trap and delt development"
          },
          {
            name: "Side Lateral Raises",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/m8c4xYSiS6U",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Medial delt isolation"
          },
          {
            name: "Rear Delt Flyes",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/fKcScHz_4pc",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Posterior delt focus"
          }
        ]
      }
    ]
  },
  {
    name: "6-Day Bodybuilder Split",
    description: "Advanced split for serious bodybuilders",
    level: "advanced",
    daysPerWeek: 6,
    days: [
      {
        name: "Day 1 - Chest",
        focus: "Complete chest development",
        exercises: [
          {
            name: "Incline Chest Press",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/Z_MmFvSKDJ0",
            description: "Upper chest focus"
          },
          {
            name: "Plate Loaded Chest Press",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/SEZSkfD6fVw",
            description: "Middle chest mass"
          },
          {
            name: "Cable Flyes",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/v41p47zWBRk",
            description: "Chest isolation"
          },
          {
            name: "Upper Cable Flyes",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/XMp6OtJxAFQ",
            description: "Upper chest definition"
          }
        ]
      },
      {
        name: "Day 2 - Back",
        focus: "Complete back development",
        exercises: [
          {
            name: "Plate Loaded Pull Down",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/T2Ettbsebtw",
            description: "Lat width"
          },
          {
            name: "Low Row",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/4f7ceHvzXOs",
            description: "Middle trap thickness"
          },
          {
            name: "Seated Row",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/lOulgkk4MSE",
            description: "Rhomboid focus"
          },
          {
            name: "Lateral Pullover",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/FnbTqDF-z0Q",
            description: "Lat stretch"
          }
        ]
      },
      {
        name: "Day 3 - Legs",
        focus: "Quadriceps and hamstrings",
        exercises: [
          {
            name: "Leg Extension",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/jOH4j7ICzR8",
            description: "Quad pre-exhaust"
          },
          {
            name: "Smith Machine Squats",
            sets: 4,
            reps: "6-12",
            technique: "To failure",
            videoUrl: "https://youtu.be/5W5GUoZnOlU",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Compound leg mass"
          },
          {
            name: "Leg Press",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/lAAxNS1rKv4",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "High volume quad work"
          },
          {
            name: "Lying Leg Curl",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/BR-9QlnCjX8",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Hamstring isolation"
          }
        ]
      },
      {
        name: "Day 4 - Calves & Forearms",
        focus: "Smaller muscle groups",
        exercises: [
          {
            name: "Seated Calf Extension",
            sets: 6,
            reps: "30 seconds on, 30 seconds off",
            videoUrl: "https://youtu.be/_YK1Msb3mzM",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Soleus focus"
          },
          {
            name: "Over Grip Forearm Curl",
            sets: 6,
            reps: "30 seconds on, 30 seconds off",
            videoUrl: "https://youtu.be/OZ7OauVXGI4",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Forearm extensors"
          },
          {
            name: "Standing Calf Raise",
            sets: 6,
            reps: "30 seconds on, 30 seconds off",
            videoUrl: "https://youtu.be/m8c4xYSiS6U",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Gastrocnemius focus"
          },
          {
            name: "Forearm Curls",
            sets: 6,
            reps: "30 seconds on, 30 seconds off",
            videoUrl: "https://youtu.be/fKcScHz_4pc",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Forearm flexors"
          }
        ]
      },
      {
        name: "Day 5 - Shoulders",
        focus: "Complete deltoid development",
        exercises: [
          {
            name: "Shoulder Press",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/_YK1Msb3mzM",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Overall shoulder mass"
          },
          {
            name: "Upright Row",
            sets: 4,
            reps: "6-12",
            videoUrl: "https://youtu.be/OZ7OauVXGI4",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Trap and delt development"
          },
          {
            name: "Side Lateral Raises",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/m8c4xYSiS6U",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Medial delt isolation"
          },
          {
            name: "Rear Delt Flyes",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/fKcScHz_4pc",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Posterior delt focus"
          }
        ]
      },
      {
        name: "Day 6 - Arms",
        focus: "Biceps and triceps",
        exercises: [
          {
            name: "Standing Curls",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/60S78-1o4ak",
            formVideoUrl: "https://youtu.be/aHzbK6NHjkg",
            description: "Bicep mass builder"
          },
          {
            name: "Stretched Curls",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/2j5HhQNPEiE",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Full range bicep work"
          },
          {
            name: "Isolation Curls",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/jC--5mXaDLQ",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Bicep peak focus"
          },
          {
            name: "Overhead Extension",
            sets: 4,
            reps: "7-12",
            technique: "Pyramid set",
            videoUrl: "https://youtu.be/Tw_B_R0ROwo",
            formVideoUrl: "https://youtu.be/6ZfSvOHvHGk",
            description: "Tricep mass builder"
          },
          {
            name: "Skull Crushers",
            sets: 4,
            reps: "12",
            technique: "Slow negatives",
            videoUrl: "https://youtu.be/wS-xNbuhFEAT",
            formVideoUrl: "https://youtu.be/pmOfGIt6N1w",
            description: "Tricep isolation"
          },
          {
            name: "Tricep Extension",
            sets: 4,
            reps: "20",
            technique: "Set to fatigue",
            videoUrl: "https://youtu.be/2JVjZjwIXCg",
            formVideoUrl: "https://youtu.be/XD3NbvjeLZc",
            description: "Tricep definition"
          }
        ]
      }
    ]
  }
]