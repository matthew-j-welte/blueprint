import React, { useState, useEffect } from "react";
import { MemberAccountDto } from "../core/models/member.model";

function Registration() {
  const [memberRegistration, setMemberRegistration] =
    useState<MemberAccountDto | null>(null);
  const [profilePicImage, setProfilePicImage] = useState(null);
  const [formChoices, setFormChoices] = useState([]);
  const [registered, setRegistered] = useState(false);

  const register = (emittedRegistration: any) => {
    setMemberRegistration(emittedRegistration.formViewModel);
    setProfilePicImage(emittedRegistration.profilePicImage);
    // if (profilePicImage) {
    //   this.subscriptions.push(
    //     this.blobService
    //       .easyUploadBlob(
    //         this.profilePicImage,
    //         'account-photos',
    //         this.memberRegistration.accountName
    //       )
    //       .subscribe((res) => {
    //         this.memberRegistration.profilePicUrl = res;
    //       })
    //   );
    // }

    // this.subscriptions.push(
    //   this.memberService.register(this.memberRegistration).subscribe((res: MemberAccountDto) => {
    //     this.registered = true;
    //     this.ctxService.login(res);
    //     this.router.navigate([
    //       ROUTE_MAP.home.base,
    //       ROUTE_MAP.home.landingDashboard,
    //     ]);
    //   })
    // );
  };

  return <h1>Registration</h1>;
}
