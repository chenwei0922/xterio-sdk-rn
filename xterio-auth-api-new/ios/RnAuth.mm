#import "RnAuth.h"

@interface RnAuth ()

@end

@implementation RnAuth
RCT_EXPORT_MODULE()

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);

    return result;
}
- (NSNumber *)test:(double)a b:(double)b {
    NSNumber *result = @(a * b);
    NSLog(@"哈哈哈");
    return result;
}
- (void)login:(NSString *)url {
//   NSURL *authURL = [NSURL URLWithString:url];
//   ASWebAuthenticationSession *authSession = [[ASWebAuthenticationSession alloc] initWithURL:authURL
//                                                                            callbackURLScheme:@"xterio-rn"
//                                                                            completionHandler:^(NSURL *callbackURL, NSError *error) {
//       if (error != nil) {
//           // 处理认证失败的情况
//         NSError *error = [NSError errorWithDomain:@"com.libeccio.xterio" code:-1 userInfo:nil];
// //        reject(@"Error", @"Open url error", error);
//       } else {
//           // 处理认证成功的情况，callbackURL 包含返回的认证信息
//           NSLog(@"Authenticated successfully: %@", callbackURL);
// //        resolve(callbackURL.absoluteString);
//       }
//   }];
//   authSession.presentationContextProvider = self;
//   if(authSession.canStart){
//     [authSession start];
//   }else{
//     //失败
//     NSError *error = [NSError errorWithDomain:@"com.libeccio.xterio" code:-1 userInfo:nil];
// //    reject(@"Error", @"Can not open url", error);
//   }
}
//- (ASPresentationAnchor)presentationAnchorForWebAuthenticationSession:(ASWebAuthenticationSession *)session{
//  return [[UIApplication sharedApplication].delegate window];
//}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnAuthSpecJSI>(params);
}

@end
