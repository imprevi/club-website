"use client";

import { useState } from "react";

interface Workshop {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  videoUrl?: string;
  notes: string;
  presenter: string;
  tags: string[];
  attendance: number;
  materials: Material[];
}

interface Material {
  id: string;
  name: string;
  type: "slides" | "code" | "diagram" | "datasheet";
  url: string;
  size: string;
}

export default function WorkshopsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mock workshop data - in real app this would come from database
  const workshops: Workshop[] = [
    {
      id: "1",
      title: "Introduction to Arduino Programming",
      date: "2025-01-15",
      duration: "2h 30m",
      description: "Covering basic Arduino setup, digital/analog I/O, and simple sensor interfacing",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      notes: `
# Arduino Programming Workshop

## Topics Covered:
- Arduino IDE setup and configuration
- Digital vs Analog pins
- Basic input/output operations
- Serial communication
- Sensor interfacing (temperature, light, ultrasonic)

## Code Examples:
- Blink LED program
- Button input handling
- Analog sensor reading
- PWM output control

## Next Steps:
- Practice with provided exercises
- Build a simple weather station
- Join our Discord for questions
      `,
      presenter: "Alex Chen",
      tags: ["arduino", "programming", "sensors", "beginner"],
      attendance: 25,
      materials: [
        {
          id: "1",
          name: "Arduino_Basics_Slides.pdf",
          type: "slides",
          url: "/materials/arduino_basics.pdf",
          size: "2.4 MB"
        },
        {
          id: "2",
          name: "sensor_examples.ino",
          type: "code",
          url: "/materials/sensor_examples.ino",
          size: "1.2 KB"
        }
      ]
    },
    {
      id: "2",
      title: "PCB Design with KiCad",
      date: "2025-01-08",
      duration: "3h 15m",
      description: "Complete PCB design workflow from schematic to fabrication files",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      notes: `
# PCB Design Workshop

## Workshop Overview:
- Schematic capture fundamentals
- Component footprint creation
- PCB layout best practices
- Design rule checking (DRC)
- Gerber file generation

## Key Learning Points:
- Proper grounding techniques
- Signal integrity considerations
- Component placement strategy
- Routing optimization
- Manufacturing constraints

## Tools Used:
- KiCad (free, open-source)
- Online PCB calculators
- Gerber viewers

## Follow-up Project:
Design a simple LED driver circuit
      `,
      presenter: "Sarah Kim",
      tags: ["pcb", "kicad", "design", "electronics"],
      attendance: 18,
      materials: [
        {
          id: "3",
          name: "KiCad_Tutorial.pdf",
          type: "slides",
          url: "/materials/kicad_tutorial.pdf",
          size: "5.1 MB"
        },
        {
          id: "4",
          name: "pcb_design_checklist.pdf",
          type: "diagram",
          url: "/materials/pcb_checklist.pdf",
          size: "800 KB"
        }
      ]
    },
    {
      id: "3",
      title: "Computer Vision with OpenCV",
      date: "2025-01-02",
      duration: "2h 45m",
      description: "Object detection, image processing, and real-time computer vision applications",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      notes: `
# Computer Vision Workshop

## Session Content:
- OpenCV installation and setup
- Image processing basics
- Object detection algorithms
- Real-time video processing
- Integration with hardware projects

## Practical Examples:
- Face detection system
- Color-based object tracking
- Motion detection
- QR code reader
- Lane detection for autonomous vehicles

## Hardware Integration:
- Raspberry Pi camera setup
- Arduino communication
- LED/servo control based on vision input

## Project Ideas:
- Smart doorbell with face recognition
- Gesture-controlled robot
- Automated sorting system
      `,
      presenter: "Marcus Johnson",
      tags: ["opencv", "python", "computer-vision", "ai"],
      attendance: 22,
      materials: [
        {
          id: "5",
          name: "opencv_examples.py",
          type: "code",
          url: "/materials/opencv_examples.py",
          size: "3.7 KB"
        },
        {
          id: "6",
          name: "Computer_Vision_Slides.pdf",
          type: "slides",
          url: "/materials/cv_slides.pdf",
          size: "4.2 MB"
        }
      ]
    }
  ];

  const allTags = Array.from(new Set(workshops.flatMap(w => w.tags)));
  const filteredWorkshops = selectedTag 
    ? workshops.filter(w => w.tags.includes(selectedTag))
    : workshops;

  const getStatusColor = (attendance: number) => {
    if (attendance >= 20) return "text-[var(--accent-success)]";
    if (attendance >= 15) return "text-[var(--accent-warning)]";
    return "text-[var(--text-muted)]";
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4">
            <span className="syntax-keyword">workshops</span>
            <span className="text-[var(--accent-primary)]">.</span>
            <span className="syntax-function">recordings</span>
            <span className="text-[var(--accent-primary)]">[]</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            <span className="syntax-comment">// Interactive learning sessions and hands-on tutorials</span>
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border-default)]">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                selectedTag === null
                  ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              all
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                  selectedTag === tag
                    ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                    : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="text-sm text-[var(--text-muted)] font-mono">
            <span className="syntax-comment">// {filteredWorkshops.length} workshops found</span>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkshops.map(workshop => (
            <div key={workshop.id} className="card p-6 group hover:scale-105 transition-transform">
              {/* Workshop Header */}
              <div className="mb-4">
                <h3 className="text-lg font-mono font-semibold mb-2 group-hover:text-[var(--accent-highlight)]">
                  {workshop.title}
                </h3>
                <div className="flex justify-between items-center text-sm text-[var(--text-secondary)] font-mono">
                  <span>{workshop.date}</span>
                  <span className={getStatusColor(workshop.attendance)}>
                    {workshop.attendance} attendees
                  </span>
                </div>
              </div>

              {/* Video Embed */}
              {workshop.videoUrl && (
                <div className="mb-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-[var(--bg-secondary)]">
                    <iframe
                      src={workshop.videoUrl}
                      title={workshop.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Workshop Info */}
              <div className="mb-4">
                <p className="text-[var(--text-secondary)] text-sm mb-2">
                  {workshop.description}
                </p>
                <div className="flex justify-between items-center text-xs text-[var(--text-muted)] font-mono">
                  <span>Duration: {workshop.duration}</span>
                  <span>By: {workshop.presenter}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {workshop.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Materials */}
              <div className="mb-4">
                <h4 className="font-mono text-sm font-semibold mb-2 text-[var(--accent-primary)]">
                  Materials:
                </h4>
                <div className="space-y-1">
                  {workshop.materials.map(material => (
                    <div key={material.id} className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[var(--text-secondary)]">
                        {material.name}
                      </span>
                      <span className="text-[var(--text-muted)]">
                        {material.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Preview */}
              <div className="border-t border-[var(--border-default)] pt-4">
                <h4 className="font-mono text-sm font-semibold mb-2 text-[var(--accent-primary)]">
                  Meeting Notes:
                </h4>
                <div className="bg-[var(--bg-secondary)] p-3 rounded text-xs font-mono text-[var(--text-muted)] max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{workshop.notes.substring(0, 200)}...</pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 p-6 bg-[var(--card-bg)] rounded-lg border border-[var(--border-default)]">
          <h3 className="text-lg font-mono font-semibold mb-4">
            <span className="syntax-keyword">workshop</span>
            <span className="text-[var(--accent-primary)]">.</span>
            <span className="syntax-function">stats</span>
            <span className="text-[var(--accent-primary)]">()</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono font-bold text-[var(--accent-primary)]">
                {workshops.length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Total Workshops</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[var(--accent-success)]">
                {workshops.reduce((sum, w) => sum + w.attendance, 0)}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Total Attendees</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[var(--accent-warning)]">
                {workshops.reduce((sum, w) => sum + parseInt(w.duration), 0)}h
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Content Hours</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[var(--accent-highlight)]">
                {allTags.length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Topic Areas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 