import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogOutListener from "../layout/useLogOutListener";
import { ZegoSuperBoardManager } from "zego-superboard-web";

function Rooms() {
  useLogOutListener();

  const { roomId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user.username;
  const randomUserId = Math.floor(Math.random() * 10000).toString();
  const [meetingContainer, setMeetingContainer] = useState(null);

  useEffect(() => {
    const appId = 2030345024;
    const serverSecret = "4b2117f16c84052a90f1238fb50211c7";

    const setupMeeting = async () => {
      if (!roomId) {
        console.error("Room ID is missing!");
        return;
      }

      if (!meetingContainer) {
        console.warn("Meeting container is not set. Retrying...");
        return;
      }

      try {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret,
          roomId,
          randomUserId,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.addPlugins({ ZegoSuperBoardManager });

        zp.joinRoom({
          container: meetingContainer,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          showPreJoinView: true,
          maxUsers: 50,
          layout: "Auto",

          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomId,
            },
          ],
          showLayoutButton: true,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      } catch (error) {
        console.error(
          "An error occurred during ZegoUIKitPrebuilt setup:",
          error
        );
      }
    };
    setupMeeting();
  }, [randomUserId, roomId, meetingContainer, userName]);

  return (
    <div>
      <div
        id="meeting-container"
        style={{ width: "100%", height: "100vh" }}
        ref={(node) => {
          // console.log("Meeting container initialized:", node);
          setMeetingContainer(node);
        }}
      />
    </div>
  );
}

export default Rooms;
