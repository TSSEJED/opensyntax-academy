import { Navbar } from "@/components/navbar"
import { LessonPlayer, type Module } from "@/components/lesson-player"

const mobileModules: Module[] = [
  {
    id: "react-native-core", title: "Module 1 — React Native Architecture",
    lessons: [
      {
        id: "native-primitives", title: "Core UI Primitives", duration: "20 min",
        description: "Transitioning your mental model from DOM HTML tags to bridging Native iOS and Android Views.",
        content: `<h2>The Native Bridge</h2>
<p>React Native does NOT use HTML or the DOM! We don't have <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, or <code>&lt;span&gt;</code> tags. Instead, we write UI using framework primitives (View, Text) that compile specifically down to identical native UI components on iOS (UIView) and Android (ViewGroup).</p>
<pre><code class="language-tsx">import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    &lt;View style={styles.container}&gt;
      &lt;Text style={styles.title}&gt;Welcome to mobile.&lt;/Text&gt;
      
      &lt;TouchableOpacity onPress={() =&gt; alert('Pressed')}&gt;
        &lt;View style={styles.button}&gt;
          &lt;Text style={styles.buttonText}&gt;Button&lt;/Text&gt;
        &lt;/View&gt;
      &lt;/TouchableOpacity&gt;
    &lt;/View&gt;
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Core RN flexbox
    alignItems: 'center',
    justifyContent: 'center',
  },
});
</code></pre>
<p>The code runs its logic asynchronously on a JavaScript thread, communicating with the Main Native App Thread via an asynchronous bridge utilizing C++ JSI (JavaScript Interface).</p>`
      },
      {
        id: "expo-router", title: "Expo File-Based Routing", duration: "25 min",
        description: "Adopt the absolute latest paradigm unifying web routing mechanics onto native mobile navigation.",
        content: `<h2>Expo Router</h2>
<p>Modern React Native development leans heavily into the Expo framework. Like Next.js, Expo Router utilizes absolute file paths in an <code>app/</code> directory to generate deep-linkable native Stack, Tab, and Drawer navigators.</p>
<pre><code class="language-tsx">// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Home, User } from 'lucide-react-native'; // Native SVG icons!

export default function TabLayout() {
  return (
    &lt;Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: 'blue' }}&gt;
      &lt;Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color }) =&gt; &lt;Home color={color} /&gt; }}
      /&gt;
      &lt;Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) =&gt; &lt;User color={color} /&gt; }}
      /&gt;
    &lt;/Tabs&gt;
  );
}
</code></pre>
<p>This layout file effortlessly manages the native iOS UITabBarController without any complex boilerplate.</p>`
      },
    ],
  },
  {
    id: "reanimated-gestures", title: "Module 2 — Interactions & 60fps",
    lessons: [
      {
        id: "reanimated", title: "Reanimated 3 Worklets", duration: "35 min",
        description: "Execute mathematical UI functions firmly on the native UI thread, bypassing JavaScript entirely.",
        content: `<h2>Running Code on the UI Thread</h2>
<p>If you animate an element across the screen using standard React Native state updates (<code>setX(x + 1)</code>), every single frame passes over the asynchronous JSON bridge. This results in heavy frame drops and sluggish UX.</p>
<h3>The power of 'worklet'</h3>
<p>With <code>react-native-reanimated</code>, functions marked computationally as <code>worklet</code> are injected directly into a secondary JS engine strictly on the Native UI thread, operating at a perfect 120/60 fps without blocking main thread interactions!</p>
<pre><code class="language-tsx">import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function BounceComponent() {
  // Not React state. These live directly in native memory
  const scale = useSharedValue(1); 

  // Native execution only
  const animatedStyle = useAnimatedStyle(() =&gt; {
    'worklet';
    return {
      transform: [{ scale: withSpring(scale.value) }]
    };
  });

  return (
    &lt;Animated.View style={[styles.box, animatedStyle]} /&gt;
  )
}
</code></pre>`
      },
      {
        id: "eas-updates", title: "Expo Application Services (EAS)", duration: "30 min",
        description: "Push 'Over-The-Air' (OTA) updates straight to devices without Apple or Google App Store reviews.",
        content: `<h2>Cloud Building & OTA</h2>
<p>Dealing with Xcode or Android Studio locally is fragile. EAS compiles your JS code strictly into iOS and Android binaries purely in the cloud utilizing CI runners.</p>
<h3>Over-The-Air (EAS Update)</h3>
<p>Because the React Native application logic is mostly a JavaScript bundle downloaded dynamically by a native wrapper, you can issue hot-fixes to thousands of production devices purely by publishing an update tag!</p>
<pre><code class="language-bash"># The native app fetches and applies this JS bundle instantly
eas update --branch production --message "Fixing critical checkout bug"
</code></pre>
<p>It's important to remember that introducing new Native Modules (camera libraries, Bluetooth) still requires compiling a completely fresh native app binary release.</p>`
      },
      {
        id: "native-modules", title: "Native Module Bridging", duration: "25 min",
        description: "Harness low-level system APIs using Swift, Objective-C, Kotlin, and JNI.",
        content: `<h2>Bridging Missing Native Functionality</h2>
<p>Sometimes you need access to a niche biometric protocol or proprietary SDK. React Native allows you to write the exact feature purely in Swift/Kotlin and bridge its methods gracefully back to TypeScript.</p>
<p>Using <code>expo-modules-core</code> significantly streamlines this pattern automatically!</p>`
      },
    ],
  },
]

export default function MobilePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Navbar />
      <LessonPlayer
        title="Mobile Engineering · React Native"
        description="Build production React Native apps for iOS and Android. Gesture-driven 60fps animations with Reanimated 3 worklets, Expo Router file-based navigation, native module bridging, and EAS CI/CD."
        category="Mobile"
        accentColor="#3DDC84"
        modules={mobileModules}
        instructor="Evan Bacon"
        rating={4.8}
        reviewCount={2040}
        lastUpdated="Mar 2026"
      />
    </div>
  )
}
