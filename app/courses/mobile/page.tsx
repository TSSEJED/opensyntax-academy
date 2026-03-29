import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const modules: Module[] = [
  {
    id: "animations",
    title: "Module 1 \u2014 Gesture & Animation",
    lessons: [
      {
        id: "reanimated",
        title: "Reanimated 3 \u2014 60fps UI Thread Animations",
        duration: "28 min",
        description: "Build gesture-driven animations using worklets that run on the UI thread via JSI.",
        content: `<h2>Reanimated 3 Gesture-Driven Animations</h2>
<p>Reanimated 3 runs animations on the UI thread via JSI — bypassing the JS bridge entirely for truly smooth 60fps animations.</p>
<pre><code>import Animated, {
  useSharedValue, useAnimatedStyle,
  useAnimatedGestureHandler, withSpring, withTiming,
  runOnJS, interpolate, Extrapolation
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"

const DISMISS_THRESHOLD = 120

export function SwipeableCard({ card, onDismiss }) {
  const translateX = useSharedValue(0)
  const opacity    = useSharedValue(1)

  const gesture = useAnimatedGestureHandler({
    onStart: (_, ctx) =&gt; { ctx.startX = translateX.value },
    onActive: (e, ctx) =&gt; { translateX.value = ctx.startX + e.translationX },
    onEnd: (e) =&gt; {
      if (Math.abs(e.translationX) &gt; DISMISS_THRESHOLD) {
        translateX.value = withTiming(
          e.translationX &gt; 0 ? 500 : -500, { duration: 250 },
          () =&gt; runOnJS(onDismiss)(card.id)
        )
        opacity.value = withTiming(0, { duration: 200 })
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 })
      }
    },
  })

  const style = useAnimatedStyle(() =&gt; ({
    transform: [
      { translateX: translateX.value },
      { rotate: \`\${interpolate(translateX.value, [-200,0,200], [-15,0,15], Extrapolation.CLAMP)}deg\` },
    ],
    opacity: opacity.value,
  }))

  return (
    &lt;PanGestureHandler onGestureEvent={gesture}&gt;
      &lt;Animated.View style={[styles.card, style]}&gt;
        &lt;CardContent card={card} /&gt;
      &lt;/Animated.View&gt;
    &lt;/PanGestureHandler&gt;
  )
}</code></pre>`,
      },
    ],
  },
]

export default function CoursePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Mobile Engineering \u00b7 React Native"
        description="Gesture-driven animations with Reanimated 3 worklets, Expo Router, native modules, and EAS CI/CD."
        category="Mobile"
        accentColor="oklch(0.72 0.17 145)"
        modules={modules}
      />
    </div>
  )
}
